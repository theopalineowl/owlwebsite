# The Opaline Owl

Production-ready Next.js 14+ (App Router) + TypeScript + Tailwind marketing site with Sanity CMS. Content for blog posts and book reviews is managed in Sanity Studio at `/studio`.

## Prerequisites

- Node.js 18+
- A [Sanity](https://sanity.io) account (free tier is fine)

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Sanity project details:

```bash
cp .env.example .env.local
```

Required:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID (from [sanity.io/manage](https://sanity.io/manage)) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name, e.g. `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version, e.g. `2024-01-01` |

## Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Next.js dev server:

   ```bash
   npm run dev
   ```

3. Open:

   - **Marketing site:** [http://localhost:3000](http://localhost:3000)
   - **Sanity Studio (edit content):** [http://localhost:3000/studio](http://localhost:3000/studio)

On first visit to `/studio`, you’ll be prompted to log in to Sanity. Create a project or link an existing one; ensure the project ID and dataset in `.env.local` match.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (site + Studio at `/studio`) |
| `npm run build` | Build for production |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |

Optional: from the project root you can run Sanity CLI commands (e.g. `npx sanity cors add` for CORS, or `npx sanity deploy` to deploy Studio to Sanity’s hosting). The Studio is also served by Next.js at `/studio`, so CLI is only needed for schema/cors/deploy.

## Deploying to Vercel

1. Push the repo to GitHub (or another Git provider supported by Vercel).
2. In [Vercel](https://vercel.com), create a new project and import the repo.
3. Add the same environment variables in the Vercel project settings (Environment Variables):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4. Deploy. Build command: `next build` (default). The marketing site and Studio at `https://your-domain.com/studio` will both be served by the same deployment.

## Project structure

- `app/` – Next.js App Router (marketing pages under `(site)`, Studio under `(studio)`)
- `components/` – Shared UI (layout, ui, blocks)
- `lib/` – Utilities; `lib/sanity/` for client, image helper, GROQ queries, types
- `sanity/` – Sanity Studio config and schemas (post, review, siteSettings)
- `public/images/` – Static assets (e.g. logo)

## Sanity desk structure

In Studio you’ll see:

- **Settings** – Singleton for site title, nav links, footer text, social links
- **Blog Posts** – Blog posts (title, slug, body, cover image, etc.)
- **Book Reviews** – Book reviews (title, slug, book author, cover, rating, body, etc.)

Dataset is set to `production` in the plan; configure it in `.env.local` and in Sanity’s project settings if you use a different dataset.
