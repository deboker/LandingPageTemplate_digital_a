import { defineArrayMember, defineField, defineType } from "sanity";

export const cmsSection = defineType({
  name: "cmsSection",
  title: "CMS section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Editable items list",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "note",
      title: "Helper note",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});
