# Notes for AI agents — Web repo

## Before changing code

1. ADRs live in **foster-together-mn** (docs): [docs/adr/README.md](https://github.com/your-org/foster-together-mn/blob/main/docs/adr/README.md).
2. **MVP 1:** directory UI only — [docs/MVP1_CHECKLIST.md](https://github.com/your-org/foster-together-mn/blob/main/docs/MVP1_CHECKLIST.md).
3. **Lost context?** Cursor plans on this machine: **`~/.cursor/plans/`** — `ftmn_custom_platform_architecture_73303726.plan.md`, `mvp1_condensed_roadmap_78ea4e2f.plan.md`, `mvp1_story_breakdown_a8b54b6d.plan.md`. Index: **docs** [AGENTS.md](https://github.com/your-org/foster-together-mn/blob/main/AGENTS.md) § *Cursor plans* (adjust URL to your remote).

## Hard rules

- **No secrets in the bundle:** only public Cognito client id, pool id, domain; API URL via `VITE_*`.
- **Sensitive fields:** hiding in UI is not enough; API must enforce (see API repo).
- **Prod:** separate **`app.`** origin from **`api.`** — CORS is configured on the API.

## Human implementer

The owner often implements themselves; prefer guidance and review unless they ask for full patches.
