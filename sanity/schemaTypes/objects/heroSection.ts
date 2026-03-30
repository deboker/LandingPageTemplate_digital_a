import { defineArrayMember, defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titlePrefix",
      title: "Title prefix",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleAccent",
      title: "Title accent",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleSuffix",
      title: "Title suffix",
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
      name: "primaryCta",
      title: "Primary CTA",
      type: "cta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "cta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metrics",
      title: "Hero metrics",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "proof",
      title: "Hero proof pills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.min(1),
    }),
  ],
});
