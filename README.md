# braydenblackcoaching.com

Newsletter signup page for Brayden Black. Static `index.html` + one Vercel function (`api/subscribe.js`) that sends signups to Kit.

## Deploy
1. Push this folder to a GitHub repo.
2. Vercel → Add New → Project → import the repo (no build settings needed).
3. Settings → Environment Variables:
   - `KIT_API_KEY` — your Kit V4 API key (starts with `kit_`)
   - `KIT_FORM_ID` — the number in your Kit form's URL (kit.com/forms/designers/**1234567**/edit)
4. Redeploy, then add `braydenblackcoaching.com` under Settings → Domains and copy the DNS records into Porkbun.

## Test
Sign up with your own email on the live site and confirm you appear in Kit under that form.
