# Foster Together MN — Web

**React + Vite + TypeScript** SPA for Foster Together MN staff: directory (MVP 1), then support, events, inventory flows. Architecture and ADRs live in the **foster-together-mn** docs repo — use a multi-root workspace or replace `your-org` in the links below.

## Related repositories

| Repo | Role |
| ---- | ---- |
| **foster-together-mn** (docs) | ADRs, diagram, [MVP1 checklist](https://github.com/your-org/foster-together-mn/blob/main/docs/MVP1_CHECKLIST.md) |
| **foster-together-mn-api** | Spring Boot REST API + Cognito |
| **this repo** | Static build → S3 + CloudFront |

## Stack

- **React 18+**, **Vite**, **TypeScript**
- **Tailwind and/or plain CSS** (no required component library)
- **Auth:** Amazon Cognito (Hosted UI or PKCE) — tokens sent as `Authorization: Bearer` to the API
- **Config:** `VITE_API_BASE_URL` → **`api.`** hostname in prod, local API URL in dev

## Local development (when scaffold exists)

```bash
cp .env.example .env   # if present — set VITE_API_BASE_URL
npm install
npm run dev
```

Cognito **callback URLs** must include your dev origin (e.g. `http://localhost:5173`).

See [AGENTS.md](AGENTS.md) for AI assistant notes.
