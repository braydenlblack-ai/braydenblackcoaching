# braydenblackcoaching.com — Steady Sundays signup site

## What this is
A one-page signup site for Brayden Black's weekly newsletter, **Steady Sundays** (anxiety, confidence, relationships; sent every Sunday). Brayden is a coach and host of The Brayden Black Podcast. The page's only job is collecting email signups.

- `index.html`: the whole page (static, no build step). Off-white editorial look: letter-spaced "BRAYDEN BLACK" wordmark (Jost), serif body (Newsreader), white signup card, circular headshot in the About section.
- `brayden.jpg`: headshot, already cropped square (shown as a circle via CSS).
- `api/subscribe.js`: Vercel serverless function. Creates the subscriber in Kit (API v4, `X-Kit-Api-Key` header), then adds them to the Kit form so the form's confirmation email goes out. Has a honeypot field (`company`) for bots.
- The front-end only calls `/api/subscribe` on `braydenblackcoaching.com` or `*.vercel.app`. Anywhere else (local preview) it fakes success.

## Stack
- **Email platform:** Kit (free plan).
- **Hosting:** Vercel, deployed from this GitHub repo (`braydenlblack-ai/braydenblackcoaching`, branch `main`).
- **Domain:** braydenblackcoaching.com, registered at Porkbun.

## Environment variables (set in Vercel, never commit)
- `KIT_API_KEY`: Kit V4 key (starts with `kit_`). Kit → Settings → Developer → V4 Keys.
- `KIT_FORM_ID`: the number in the Kit form's edit URL (`kit.com/forms/designers/<ID>/edit`).

## Status (as of Nov 7, 2026)
Done: page built, code on GitHub.
Remaining:
1. Kit: account, inline form "Steady Sundays – Website" with the incentive (confirmation) email on, form ID, V4 API key.
2. Vercel: import repo, set both env vars, deploy, test signup on the `.vercel.app` URL.
3. Domain: add braydenblackcoaching.com in Vercel; in Porkbun DNS delete the default parking records (ALIAS/CNAME on root and `*`), then add the A and CNAME records Vercel shows.
4. Kit sending domain: add the DNS records Kit gives (Settings → Email) in Porkbun, then verify.
5. Welcome email: a Kit automation triggered by "joins form."

## Working rules
- Brayden isn't a developer. Explain steps in plain language, one at a time, and say exactly where to click when he has to do something in a web dashboard.
- Never ask him to paste API keys or secrets into the chat. Have him enter them directly into the Vercel dashboard, `vercel env add` (which prompts for the value), or a local `.env` file that stays out of git.
- Prefer the Vercel CLI (`npx vercel`) for linking, env vars, deploys and domains when it's available. For Porkbun DNS, use its web dashboard unless he sets up Porkbun API keys himself.
- Keep the page a single static `index.html` with no frameworks or build step unless he asks for more.
- Commit with clear messages and push to `main`. Vercel redeploys automatically.
