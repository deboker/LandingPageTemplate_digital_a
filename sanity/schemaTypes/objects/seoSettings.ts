import { defineArrayMember, defineField, defineType } from "sanity";

export const seoSettings = defineType({
  name: "seoSettings",
  title: "SEO settings",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(170),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
});
