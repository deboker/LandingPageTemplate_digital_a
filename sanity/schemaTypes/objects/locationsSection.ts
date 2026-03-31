import { defineArrayMember, defineField, defineType } from "sanity";

export const locationsSection = defineType({
  name: "locationsSection",
  title: "Locations section",
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
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Locations",
      type: "array",
      of: [defineArrayMember({ type: "locationItem" })],
      validation: (rule) => rule.required().min(2).max(4),
    }),
  ],
});
