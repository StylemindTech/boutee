// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./author";
import { blockContentType, tableBlockType } from "./blockContent";
import { categoryType } from "./category";
import { postType } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, blockContentType, tableBlockType, categoryType, postType],
};
