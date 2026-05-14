# TitanLaser B2B Content System Demo

Astro + Payload CMS demo for a high-conversion B2B inquiry website. The project models products, technical specs, case studies, experts, FAQs, topic content, PDP conversion blocks, and JSON-LD from structured content.

## Local Development

```bash
pnpm install
pnpm dev
```

- Web: `http://localhost:4321`
- CMS: `http://localhost:3001/admin`
- Demo admin: `admin@titanlaser.local / TitanLaserDemo123!` after running seed

For a clean local database, run Postgres locally and set `DATABASE_URI`, then:

```bash
pnpm --filter @titanlaser/cms migrate
pnpm seed
```

## Production Deployment

The primary deployment target is netcup VPS + Dokploy:

- Astro web served by Nginx
- Payload CMS served by Node.js
- Postgres persisted in a Docker volume
- Cloudflare R2 used for uploads through S3-compatible storage

See [Dokploy VPS deployment](docs/dokploy-vps-deployment.md).
