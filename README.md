# Digital A Landing Page Template

Modern landing page starter built with `Next.js`, `Tailwind CSS`, `Motion for React`, and a Sanity-ready content layer.

## Included

- App Router setup with separate `/sk` and `/en` routes
- Tailwind v4 styling with a premium landing-page visual direction
- Motion-based reveal and floating components
- Metadata, sitemap, robots and locale alternates for SEO
- Fallback content so the site works before Sanity is connected
- Sanity client helpers and a `landingPage` query prepared for your CMS

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the env file:

```bash
cp .env.example .env.local
```

3. Start development:

```bash
npm run dev
```

4. Optional checks:

```bash
npm run lint
npm run typecheck
```

## Sanity connection

The project already contains your Sanity project ID:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=ypdwbs5t`

You still need to confirm:

- dataset name, usually `production`
- optional read token if you want preview or private content
- your site URL for production metadata

See `docs/sanity-model.md` for the content model this frontend expects.

## Main files

- `app/[locale]/page.tsx`: main landing page structure
- `app/globals.css`: color tokens, fonts and global visual setup
- `lib/landing-page.ts`: fallback content and CMS merge logic
- `lib/sanity/client.ts`: Sanity client configuration
- `lib/sanity/queries.ts`: GROQ query for `landingPage`

## Next customizations

- Replace CTA destinations and contact data in `lib/landing-page.ts`
- Change the visual direction in `app/globals.css`
- Add forms, analytics or extra sections directly inside `app/[locale]/page.tsx`
