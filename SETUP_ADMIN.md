# Admin Panel Setup Guide

## Overview

The admin panel lives at `/admin` (hidden from the main navigation). It lets authorised users update quarterly and cumulative performance data without touching code.

---

## 1. Vercel KV — Persistent Storage

Performance data is stored in **Vercel KV** (powered by Upstash Redis). Without KV, the site falls back to the hardcoded data in `src/data/performance-data.json` — so it works locally out of the box, but edits made through the admin panel won't persist until KV is set up.

### Enable KV on Vercel

1. Open your project on [vercel.com](https://vercel.com).
2. Go to **Storage** → **Create Database** → choose **KV**.
3. Name it (e.g. `molecule-kv`) and click **Create**.
4. In the KV dashboard, click **Connect Project** and select your Molecule Ventures project.
5. Vercel automatically adds the required environment variables to your deployment.

### Local Development

For local testing of the admin panel, add these to a `.env.local` file (never commit this file):

```
KV_REST_API_URL=<your-kv-url-from-vercel-dashboard>
KV_REST_API_TOKEN=<your-kv-token-from-vercel-dashboard>
ADMIN_COOKIE_SECRET=<any-long-random-string>
```

You can find the URL and token in the Vercel KV dashboard under **Quickstart → `.env.local`**.

---

## 2. Environment Variables

| Variable | Required in Production | Description |
|---|---|---|
| `KV_REST_API_URL` | Yes | Set automatically by Vercel after connecting KV |
| `KV_REST_API_TOKEN` | Yes | Set automatically by Vercel after connecting KV |
| `ADMIN_COOKIE_SECRET` | Recommended | Random string used to sign session cookies. Defaults to a dev value if unset. |

Add `ADMIN_COOKIE_SECRET` manually in **Vercel → Project → Settings → Environment Variables**.

---

## 3. Admin Credentials

| Field | Value |
|---|---|
| Allowed emails | `chandan@moleculeventures.in`, `pranjal@moleculeventures.in` |
| Login password | `Molecule@2026` |
| Edit-past-periods password | `EditMolecule@2026` |

To change these, edit `src/lib/admin-auth.ts` — the `ALLOWED_EMAILS`, `LOGIN_PASSWORD`, and `EDIT_PASSWORD` constants.

---

## 4. How the Admin Panel Works

- **Login** at `/admin` with your email and password.
- The **dashboard** at `/admin/dashboard` shows a table of all quarterly entries.
- **Current period** (the last row, highlighted in blue) can be edited freely.
- **Past periods** require the edit password (`EditMolecule@2026`) before saving or deleting.
- **Add New Quarter** appends a new row to the end.
- After saving, the public About Us page refreshes within **1 hour** (ISR revalidation). The data itself updates instantly.

---

## 5. First Deployment Checklist

- [ ] Push code to GitHub
- [ ] Connect project to Vercel
- [ ] Enable Vercel KV and connect to the project
- [ ] Add `ADMIN_COOKIE_SECRET` environment variable
- [ ] Deploy and visit `/admin` to verify login works
- [ ] Add a test quarter and check `/about-us` (may take up to 1 hour for ISR, or trigger a manual redeploy to see it immediately)
