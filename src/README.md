# InnovateUS Registration Form — Newsletter Opt-In

A registration form matching the visual design of [innovate-us.org/register](https://innovate-us.org/register), extended with a newsletter opt-in checkbox. Built with React + Vite + TypeScript. Submissions are stored in the Burnes Center's Directus instance, in the `cw_intake` collection.

## Live demo

**[https://innovate-us.vercel.app](https://innovate-us.vercel.app)**

## Tech stack

- **Frontend:** React 18, TypeScript, Vite
- **Backend:** Vercel Serverless Function (Node.js)
- **CMS:** Directus (`cw_intake` collection)
- **Hosting:** Vercel

## Project structure

```
src/
  app.tsx                # Page layout: partner bar, header, event card, footer
  registration-form.tsx  # Form component: state, validation, submission
  main.tsx               # React entry point
  index.css              # Design tokens + styles matching InnovateUS
api/
  register.js            # Serverless function — proxies to Directus, holds the token
index.html               # Vite entry point
.env.example              # Template for the required environment variable
```

## Why a serverless proxy?

The frontend never talks to Directus directly and never holds the access token. The browser POSTs to `/api/register` (same origin); that serverless function reads the token from an environment variable and forwards the request to Directus. This keeps the token out of page source, the browser's Network tab, and git history, the only two places it ever lives are the local `.env.local` file (gitignored) and Vercel's Environment Variables dashboard.

## Directus schema

Confirmed by testing directly against the API (see Process below). Required fields on `cw_intake`:

| Field | Type | Notes |
|---|---|---|
| `email` | string | Required |
| `first_name` | string | Required |
| `last_name` | string | Required |
| `country` | string | Required |
| `gov_org` | string (`"yes"` / `"no"`) | Required |
| `workshop_series` | string | Required; hardcoded to the workshop shown on this page |
| `newsletter` | boolean | New field added for this assignment — the opt-in |

Optional fields present in the collection but not populated by this form: `state`, `workshops`, `gov_level`, `consent_at`.

## Local development

```bash
npm install
npm i -g vercel                    # needed to run the API route locally
cp .env.example .env.local         # then fill in the real Directus token
vercel dev
```

`vercel dev` runs the Vite frontend and the `/api` serverless function together, plain `vite dev` alone can't run the API route.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it into Vercel.
3. In **Settings → Environment Variables**, add `DIRECTUS_TOKEN` (uncheck "Sensitive" so it's available in the Development environment too, if you want `vercel env pull` to work locally).
4. Deploy.

## Process notes

- **Design:** Matched InnovateUS's existing visual language (navy/blue palette, serif display headings, pill buttons, card-based layout) directly from the live site and reference screenshots, rather than introducing a new design system, the brief called for conforming to an existing design, not creating one.
- **Schema discovery:** Rather than guessing Directus field names, sent test POST requests directly via curl to `cw_intake` and read the validation errors it returned. This revealed the real required fields (`gov_org`, `workshop_series`, `newsletter`) — several of which didn't match initial assumptions (`gov_affiliated`, `newsletter_opt_in`).
- **Newsletter field:** `newsletter` already existed as a field in the collection; this form is what populates it. Defaults to unchecked, per standard opt-in consent practice.
- **Security:** Chose a server-side proxy over embedding the Directus token client-side. Server-side validation duplicates client-side validation, since the API endpoint can be called directly and shouldn't trust client input alone.
- **`workshop_series` is hardcoded** to the one workshop shown in the reference design, since this prototype represents a single event's registration page rather than a multi-event system with routing.
- Test submissions during development used made-up emails; the final submission carries a real name, per the assignment's instructions, so it's identifiable among the test records in the collection.