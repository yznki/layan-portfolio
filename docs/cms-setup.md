# CMS Setup

This project now uses **Decap CMS + GitHub + Vercel**.

## What Layan uses

- The portfolio site on Vercel
- `/admin` on that site
- A GitHub login popup

After setup, she edits through forms. She does not touch code, terminals, branches, or manual commits.

## How it works

1. Layan opens `https://your-site.com/admin`
2. Decap asks her to log into GitHub
3. She edits project or reel entries
4. Decap commits the changed files into the repo
5. Vercel sees the push and rebuilds the site

## What you need before it works

You need 4 things:

1. A GitHub repo for the portfolio
2. Layan added as a collaborator with write access
3. A GitHub OAuth app
4. A tiny OAuth proxy URL for Decap

## Step 1 — Put the site on GitHub

Create a GitHub repo for this portfolio if you have not already.

Then update [public/admin/config.yml](/Users/yznki/development/layan-portfolio/public/admin/config.yml):

```yml
backend:
  name: github
  repo: your-github-org/your-repo
  branch: master
```

Replace `your-github-org/your-repo` with the real repo name.

If your default branch is `main`, change `branch: master` to `branch: main`.

## Step 2 — Give Layan GitHub access

Layan needs a GitHub account.

Add her to the repo as a collaborator with write access.

That is what lets Decap save edits to the repo for her.

## Step 3 — Create a GitHub OAuth app

In GitHub:

1. Go to **Settings**
2. Go to **Developer settings**
3. Go to **OAuth Apps**
4. Create a new OAuth app

Use values like:

- **Homepage URL:** `https://your-site.com`
- **Authorization callback URL:** `https://your-oauth-proxy.example.com/callback`

Save the:

- Client ID
- Client Secret

## Step 4 — Deploy a free OAuth proxy

Decap needs a tiny auth server in front of GitHub OAuth.

The free route is a small **Cloudflare Worker** or similar free serverless proxy.

Your proxy needs to expose:

- `/auth`
- `/callback`

Then update [public/admin/config.yml](/Users/yznki/development/layan-portfolio/public/admin/config.yml):

```yml
backend:
  base_url: https://your-oauth-proxy.example.com
  auth_endpoint: auth
```

## Step 5 — Deploy the portfolio on Vercel

Connect the GitHub repo to Vercel.

That is enough for the public site.

No special environment variables are needed for Decap itself in this repo.

## Step 6 — Test the editor

After deploy:

1. Open `https://your-site.com/admin`
2. Click login
3. Authenticate with GitHub
4. Edit one reel or project
5. Save
6. Publish
7. Confirm a commit appears in GitHub
8. Wait for Vercel to rebuild

## What Decap edits in this repo

- Projects: `content/work/*.md`
- Reels: `public/reels.json`
- Uploaded images: `public/images/uploads/`

## Important limitation right now

This setup already covers:

- add new projects
- edit existing projects
- upload project images
- edit reels

It does **not yet** put the About page, contact details, CV, and other global text into CMS-managed files. Those can be moved next if you want the whole site editable from Decap.
