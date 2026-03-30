# Digital A Landing Page Template

Modern landing page starter built with `Next.js`, `Tailwind CSS`, `Motion for React`, and a Sanity-ready content layer.

## Included

- App Router setup with separate `/sk` and `/en` routes
- Embedded Sanity Studio on `/studio`
- Tailwind v4 styling with a premium landing-page visual direction
- Motion-based reveal and floating components
- Metadata, sitemap, robots and locale alternates for SEO
- Fallback content so the site works before Sanity is connected
- Sanity client helpers, schema files and a `landingPage` query prepared for your CMS

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

## Studio route

The Studio is embedded directly in this Next.js app:

- `http://localhost:3000/studio`

Schema files live in the `sanity/` folder. Editors get two fixed entries:

- `Home Page SK`
- `Home Page EN`

Each document is split into section tabs such as Hero, Overview, Features, Process, FAQ, Footer and SEO.

## Netlify deploy

This project is ready for Netlify with the built-in Next.js support.

Suggested settings:

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `22.13.0`

Environment variables should be set in the Netlify UI, not in `netlify.toml`, because runtime functions need access to them.

Add these variables in Netlify:

- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
- `NEXT_PUBLIC_SANITY_PROJECT_ID=ypdwbs5t`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2026-03-30`
- `SANITY_API_READ_TOKEN=` optional, only if you want private reads or preview-style behavior

After Netlify gives you a deploy URL, add that URL in Sanity project settings as an allowed CORS origin, for example:

- `https://your-site.netlify.app`
- `https://your-domain.com`

If you want the embedded Studio to work on production, those same domains must be allowed in Sanity as well.

## Main files

- `app/[locale]/page.tsx`: main landing page structure
- `app/globals.css`: color tokens, fonts and global visual setup
- `lib/landing-page.ts`: fallback content and CMS merge logic
- `lib/sanity/client.ts`: Sanity client configuration
- `lib/sanity/queries.ts`: GROQ query for `landingPage`
- `sanity.config.ts`: Studio configuration
- `sanity/structure.ts`: fixed Studio entries for SK and EN homepage content
- `sanity/schemaTypes/`: document and object schemas for the homepage editor
- `netlify.toml`: explicit Netlify build settings

## Next customizations

- Replace CTA destinations and contact data in `lib/landing-page.ts`
- Change the visual direction in `app/globals.css`
- Add forms, analytics or extra sections directly inside `app/[locale]/page.tsx`
