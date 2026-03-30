import { defineField, defineType } from "sanity";

export const footerContent = defineType({
  name: "footerContent",
  title: "Footer content",
  type: "object",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
