# Shades of Beautiful

Static site built with [Eleventy](https://www.11ty.dev/). Journal posts are Markdown files in `src/journal/`.

## Cloudflare Pages settings
- Build command: `npm run build`
- Build output directory: `_site`
- Node version: 20 or newer

## Writing posts
Use Pages CMS (the `.pages.yml` file sets it up), or add a `.md` file to `src/journal/` with a title, date, description, and cover photo. Set `draft: true` to hide a post.

## Analytics
Paste your Cloudflare Web Analytics token into `src/_data/site.json` (`cloudflareAnalyticsToken`).

## Before launch
- Contact form: it only shows a thank-you message. It needs a real form handler.
- Instagram and Facebook links: set them in `src/_data/site.json`.

## Local preview
`npm install` then `npm start`.
