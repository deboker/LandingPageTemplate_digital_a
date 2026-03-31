import { defineArrayMember, defineField, defineType } from "sanity";

export const gallerySection = defineType({
  name: "gallerySection",
  title: "Gallery section",
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
      name: "sideHighlightsTitle",
      title: "Secondary card eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sideIncludedTitle",
      title: "Third card eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Gallery items",
      type: "array",
      of: [defineArrayMember({ type: "galleryItem" })],
      validation: (rule) => rule.required().min(3).max(3),
    }),
  ],
});
