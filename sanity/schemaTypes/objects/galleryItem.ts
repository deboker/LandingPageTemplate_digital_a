import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageUrl",
      title: "External image URL",
      type: "url",
      description:
        "Optional. Use this when you want to prefill the gallery with an external image URL.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional. Upload a Sanity image asset here if you do not want to use an external URL.",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { imageUrl?: string } | undefined;

          if (value || parent?.imageUrl) {
            return true;
          }

          return "Provide either an uploaded image or an external image URL.";
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "subtitle",
    },
  },
});
