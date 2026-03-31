# Notes for AI agents — Web repo

## Before changing code

1. ADRs live in **foster-together-mn** (docs): [docs/adr/README.md](https://github.com/your-org/foster-together-mn/blob/main/docs/adr/README.md).
2. **MVP 1:** directory UI only — [docs/MVP1_CHECKLIST.md](https://github.com/your-org/foster-together-mn/blob/main/docs/MVP1_CHECKLIST.md). **Current focus:** [docs/MVP1_STORIES.md](https://github.com/your-org/foster-together-mn/blob/main/docs/MVP1_STORIES.md) story **7.1b** — app shell (side nav + top bar) + TanStack Router; Home = playground (`/`); agencies at `/agencies`; households/people placeholders until later stories.
3. **Lost context?** Cursor plans on this machine: **`~/.cursor/plans/`** — `ftmn_custom_platform_architecture_73303726.plan.md`, `mvp1_condensed_roadmap_78ea4e2f.plan.md`, `mvp1_story_breakdown_a8b54b6d.plan.md`, and `jotform_intake_integration_addendum_bea5f71c.plan.md` (deferred Micayla intake integration fields + mapping considerations). Index: **docs** [AGENTS.md](https://github.com/your-org/foster-together-mn/blob/main/AGENTS.md) § *Cursor plans* (adjust URL to your remote).
4. **Design source of truth for web UI:** read [docs/mocks/DESIGN.md](https://github.com/your-org/foster-together-mn/blob/main/docs/mocks/DESIGN.md) and review images in [docs/mocks/](https://github.com/your-org/foster-together-mn/tree/main/docs/mocks) before implementing screens/tokens.

## Design rationale (why, not only what)

The owner wants **decisions explained**, not blind checklists. When you propose or implement UI, tie choices to [docs/mocks/DESIGN.md](https://github.com/your-org/foster-together-mn/blob/main/docs/mocks/DESIGN.md) and the mock images. Give a **short reason** for each non-obvious choice.

| Topic | Why we do it |
| --- | --- |
| **Design tokens (CSS variables)** | One place for colors, spacing, type, and radii so the app stays consistent and restyling does not mean hunting scattered hex values. Values and roles should match DESIGN.md (e.g. surfaces, primary, on-surface). |
| **Newsreader + Work Sans** | DESIGN.md pairs a **display serif** (editorial, human warmth) with a **body sans** (legibility for forms and operational data). That split is intentional, not arbitrary font mixing. |
| **Surfaces and tonal layering** | DESIGN.md discourages relying on **1px borders** for hierarchy. Prefer background shifts (`surface` → `surface-container-low`, etc.) and spacing so layouts feel organic, not boxed-in. |
| **Primary button treatment** | DESIGN.md calls for a **subtle gradient** on primary CTAs between primary and primary-container for depth without a flat “default button” look. |
| **Small steps (e.g. Button before full pages)** | Validate tokens and one component in the running app before building full screens. Fewer surprises and easier rollback. |
| **Mocks vs implementation** | Images under `docs/mocks/` are **layout and mood references**, not pixel-perfect specs. Implement with tokens and DESIGN.md rules; match the system, not every pixel. |

## Hard rules

- **No secrets in the bundle:** only public Cognito client id, pool id, domain; API URL via `VITE_*`.
- **Sensitive fields:** hiding in UI is not enough; API must enforce (see API repo).
- **Prod:** separate **`app.`** origin from **`api.`** — CORS is configured on the API.

## Human implementer

The owner often implements themselves; prefer guidance and review unless they ask for full patches.
