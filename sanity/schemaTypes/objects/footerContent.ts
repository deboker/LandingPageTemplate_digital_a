import { defineField, defineType } from "sanity";

export const footerContent = defineType({
  name: "footerContent",
  title: "Footer content",
  type: "object",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
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
      name: "phone",
      title: "Contact phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
