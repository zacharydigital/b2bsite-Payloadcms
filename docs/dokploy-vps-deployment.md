# TitanLaser Dokploy VPS Deployment

This is the primary deployment path for the demo site.

## Architecture

- Web: Astro static site served by Nginx in `web`
- CMS: Payload CMS / Next.js served by Node in `cms`
- Database: Postgres container with persistent Docker volume
- Uploads: Cloudflare R2 through the S3-compatible Payload storage adapter
- DNS / SSL / CDN: Cloudflare in front of the netcup VPS

Recommended domains:

- `demo.yourstudio.com` -> `web` service, port `80`
- `cms-demo.yourstudio.com` -> `cms` service, port `3001`
- `media.yourstudio.com` -> Cloudflare R2 public/custom domain

## Dokploy Setup

1. Push this repository to GitHub.
2. In Dokploy, create a new Docker Compose application from the GitHub repository.
3. Use `docker-compose.dokploy.yml` as the compose file.
4. Add the environment variables from `.env.dokploy.example`.
5. In Dokploy Domains, bind:
   - `demo.yourstudio.com` to the `web` service on port `80`
   - `cms-demo.yourstudio.com` to the `cms` service on port `3001`
6. Deploy the application from the `main` branch.

## Required Environment Variables

Use strong production values in Dokploy; do not commit real secrets.

```env
POSTGRES_DB=titanlaser
POSTGRES_USER=titanlaser
POSTGRES_PASSWORD=replace-with-a-strong-postgres-password
DATABASE_URI=postgres://titanlaser:replace-with-a-strong-postgres-password@postgres:5432/titanlaser

PAYLOAD_SECRET=replace-with-a-long-random-secret
SITE_URL=https://demo.yourstudio.com
CMS_URL=https://cms-demo.yourstudio.com
PUBLIC_PAYLOAD_URL=https://cms-demo.yourstudio.com/api

S3_BUCKET=titanlaser-media-prod
S3_REGION=auto
S3_ENDPOINT=https://<cloudflare-account-id>.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=replace-with-r2-access-key
S3_SECRET_ACCESS_KEY=replace-with-r2-secret-key
S3_PUBLIC_URL=https://media.yourstudio.com
```

## First Deploy Initialization

After the first successful deploy, open the Dokploy terminal for the `cms` service and run:

```bash
pnpm --filter @titanlaser/cms migrate
pnpm --filter @titanlaser/cms seed
```

The seed script creates the demo admin account:

```txt
admin@titanlaser.local / TitanLaserDemo123!
```

## Update Flow

1. Commit changes locally.
2. Push to `origin/main`.
3. Dokploy pulls the latest GitHub code and rebuilds the Compose application.
4. If Payload collection schemas changed, run migrations in the `cms` service.

## Notes

- The web build is static. Published CMS changes are reflected after rebuilding the `web` service.
- R2's S3 endpoint is for uploads only. Public file URLs must use `S3_PUBLIC_URL`, usually an R2 custom domain.
- Keep Postgres data in the named Docker volume `postgres_data`; do not store it in the repository.
