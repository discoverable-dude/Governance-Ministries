import { defineArrayMember, defineField, defineType } from "sanity";

const accents = ["orange", "red", "burgundy", "blue", "cyan", "aqua"];
const link = defineField({ name: "link", type: "object", fields: [{ name: "label", type: "string" }, { name: "href", type: "string" }] });
const image = (name: string) =>
  defineField({ name, type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] });
const cta = (name: string) => ({ name, type: "object", fields: [{ name: "label", type: "string" }, { name: "href", type: "string" }] });

const seo = defineType({
  name: "seo", type: "object",
  fields: [
    { name: "metaTitle", type: "string", validation: (r) => r.max(70) },
    { name: "metaDescription", type: "text", rows: 3, validation: (r) => r.max(160) },
    image("ogImage"),
    { name: "noIndex", type: "boolean", initialValue: false },
  ],
});

const section = (name: string, fields: object[]) => defineArrayMember({ name, type: "object", fields: fields as never });

export const schemaTypes = [
  seo,
  defineType({
    name: "siteSettings", type: "document", title: "Site settings",
    fields: [
      { name: "siteName", type: "string" },
      { name: "nav", type: "array", of: [{ type: "object", fields: link.fields! }] },
      cta("headerCta"),
      { name: "footerNav", type: "array", of: [{ type: "object", fields: link.fields! }] },
      { name: "contact", type: "object", fields: [{ name: "address", type: "string" }, { name: "phone", type: "string" }, { name: "email", type: "string" }] },
      { name: "charityNumber", type: "string" },
      { name: "socialLinks", type: "array", of: [{ type: "object", fields: link.fields! }] },
    ],
  }),
  defineType({
    name: "division", type: "document",
    fields: [
      { name: "name", type: "string", validation: (r) => r.required() },
      { name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() },
      { name: "summary", type: "text", rows: 3 },
      { name: "body", type: "array", of: [{ type: "block" }] },
      { name: "externalUrl", type: "url" },
      { name: "accentColour", type: "string", options: { list: accents }, validation: (r) => r.required() },
      image("heroImage"),
      { name: "order", type: "number" },
    ],
  }),
  defineType({
    name: "newsPost", type: "document",
    fields: [
      { name: "title", type: "string", validation: (r) => r.required() },
      { name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() },
      { name: "publishedAt", type: "datetime", validation: (r) => r.required() },
      { name: "excerpt", type: "text", rows: 3 },
      { name: "division", type: "reference", to: [{ type: "division" }] },
      image("coverImage"),
      { name: "body", type: "array", of: [{ type: "block" }] },
      { name: "seo", type: "seo" },
    ],
  }),
  defineType({
    name: "page", type: "document",
    fields: [
      { name: "title", type: "string" },
      { name: "slug", type: "slug", options: { source: "title" } },
      {
        name: "sections", type: "array",
        of: [
          section("hero", [{ name: "heading", type: "string" }, { name: "intro", type: "text" }, { name: "compact", type: "boolean" }, image("image"), cta("primaryCta"), cta("secondaryCta")]),
          section("statRow", [{ name: "items", type: "array", of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }] }]),
          section("cardGrid", [{ name: "heading", type: "string" }, { name: "fromDivisions", type: "boolean", title: "Show all divisions" }, { name: "columns", type: "number", options: { list: [2, 3] } },
            { name: "cards", type: "array", of: [{ type: "object", fields: [{ name: "title", type: "string" }, { name: "body", type: "text" }, { name: "accent", type: "string", options: { list: accents } }, cta("link")] }] }]),
          section("splitFeature", [{ name: "heading", type: "string" }, { name: "eyebrow", type: "string" }, { name: "body", type: "text" },
            { name: "quote", type: "object", fields: [{ name: "text", type: "text" }, { name: "attribution", type: "string" }] }, image("image"), cta("cta")]),
          section("timeline", [{ name: "heading", type: "string" }, { name: "items", type: "array", of: [{ type: "object", fields: [{ name: "year", type: "string" }, { name: "title", type: "string" }, { name: "body", type: "text" }] }] }]),
          section("richText", [{ name: "heading", type: "string" }, { name: "ruled", type: "boolean" }, { name: "body", type: "array", of: [{ type: "block" }] }, cta("link")]),
          section("ctaBand", [{ name: "heading", type: "string" }, { name: "body", type: "text" }, cta("cta")]),
          section("newsTeaser", [{ name: "heading", type: "string" }, { name: "limit", type: "number", initialValue: 3 }, cta("link")]),
          section("logoRow", [{ name: "heading", type: "string" }, { name: "logos", type: "array", of: [{ type: "object", fields: [{ name: "name", type: "string" }, { name: "url", type: "url" }, image("image")] }] }]),
        ],
      },
      { name: "seo", type: "seo" },
    ],
  }),
];
