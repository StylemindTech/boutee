import { createClient } from "@sanity/client";
import { uuid } from "@sanity/uuid";

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing SANITY_PROJECT_ID/SANITY_DATASET/SANITY_WRITE_TOKEN env vars."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const ensureKey = (node) => ({
  ...node,
  _key: node._key || uuid(),
});

const normalizeChildren = (children = []) =>
  children.map((child) => ensureKey(child));

const normalizeCellContent = (content = []) =>
  content.map((child) => {
    if (child?._type === "block") {
      return {
        ...ensureKey(child),
        children: normalizeChildren(child.children),
      };
    }
    return ensureKey(child);
  });

const normalizeRowCells = (cells = []) =>
  cells.map((cell) => ({
    ...ensureKey(cell),
    content: normalizeCellContent(cell.content),
  }));

const normalizeBodyBlock = (block) => {
  if (!block || typeof block !== "object") return block;

  if (block._type === "block") {
    return {
      ...ensureKey(block),
      children: normalizeChildren(block.children),
    };
  }

  if (block._type === "tableBlock") {
    const rows = Array.isArray(block.rows) ? block.rows : [];
    return {
      ...ensureKey(block),
      rows: rows.map((row) => ({
        ...ensureKey(row),
        cells: normalizeRowCells(row?.cells || []),
      })),
    };
  }

  if (block._type === "image" || block._type === "code") {
    return ensureKey(block);
  }

  return ensureKey(block);
};

async function main() {
  const docs = await client.fetch(
    `*[_type == "post" && defined(body)][]._id`
  );

  console.log(`Found ${docs.length} posts to inspect`);

  for (const id of docs) {
    const doc = await client.getDocument(id);
    const body = Array.isArray(doc?.body) ? doc.body : [];
    const normalizedBody = body.map(normalizeBodyBlock);

    const changed =
      JSON.stringify(body) !== JSON.stringify(normalizedBody);

    if (!changed) continue;

    console.log(`Patching ${id} with backfilled _key values`);
    await client
      .patch(id)
      .set({ body: normalizedBody })
      .commit({ autoGenerateArrayKeys: false });
  }

  console.log("Done. Missing _key values have been backfilled where needed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
