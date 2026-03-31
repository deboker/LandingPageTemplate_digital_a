import { defineField, defineType } from "sanity";

export const locationItem = defineType({
  name: "locationItem",
  title: "Location item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address / area",
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
      name: "mapEmbedUrl",
      title: "Google Maps embed URL",
      type: "url",
      description:
        "Paste the Google Maps embed URL used inside the iframe src attribute.",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
});
