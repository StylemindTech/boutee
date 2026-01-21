
import { defineType, defineArrayMember, defineField } from "sanity";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

const richTextDecorators = [
  { title: "Strong", value: "strong" },
  { title: "Emphasis", value: "em" },
  { title: "Underline", value: "underline" },
  { title: "Strike", value: "strike-through" },
  { title: "Code", value: "code" },
];

const richTextAnnotations = [
  {
    title: "URL",
    name: "link",
    type: "object",
    fields: [
      {
        title: "URL",
        name: "href",
        type: "url",
      },
    ],
  },
];

const baseBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H1", value: "h1" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "H4", value: "h4" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [{ title: "Bullet", value: "bullet" }],
  marks: {
    decorators: richTextDecorators,
    annotations: richTextAnnotations,
  },
});

const tableCellBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "Normal", value: "normal" }],
  lists: [{ title: "Bullet", value: "bullet" }],
  marks: {
    decorators: richTextDecorators,
    annotations: richTextAnnotations,
  },
});

const extractPlainText = (blocks: unknown): string => {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block && typeof block === "object" && (block as any)._type === "block")
    .map((block) =>
      Array.isArray((block as any).children)
        ? (block as any).children.map((child: any) => child?.text || "").join("")
        : ""
    )
    .join(" ")
    .trim();
};

export const tableBlockType = defineType({
  title: "Table",
  name: "tableBlock",
  type: "object",
  fields: [
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "tableRow",
          title: "Row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [
                defineArrayMember({
                  name: "tableCell",
                  title: "Cell",
                  type: "object",
                  fields: [
                    defineField({
                      name: "content",
                      title: "Content",
                      type: "array",
                      of: [tableCellBlock],
                    }),
                  ],
                  preview: {
                    select: { content: "content" },
                    prepare({ content }) {
                      const text = extractPlainText(content);
                      return {
                        title: text || "Empty cell",
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }) {
              const count = Array.isArray(cells) ? cells.length : 0;
              return {
                title: `Row (${count} column${count === 1 ? "" : "s"})`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare({ rows }) {
      const count = Array.isArray(rows) ? rows.length : 0;
      return {
        title: "Table",
        subtitle: `${count} row${count === 1 ? "" : "s"}`,
      };
    },
  },
});

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    baseBlock,
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        {
          name: "caption",
          type: "array",
          title: "Caption",
          of: [
            defineArrayMember({
              type: "block",
              styles: [{ title: "Normal", value: "normal" }],
              lists: [],
              marks: {
                decorators: richTextDecorators,
                annotations: richTextAnnotations,
              },
            }),
          ],
        },
      ],
    }),
    defineArrayMember({
      type: "tableBlock",
    }),
    defineArrayMember({
      title: "Divider",
      name: "divider",
      type: "object",
      fields: [
        defineField({
          name: "hiddenLabel",
          title: "Hidden",
          type: "string",
          initialValue: "divider",
          hidden: true,
          readOnly: true,
        }),
      ],
    }),
  ],
});
