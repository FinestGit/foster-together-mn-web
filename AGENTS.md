# Notes for AI agents — Web repo

## Canonical handoff

Start with the **docs** repo: [AGENTS.md](https://github.com/your-org/foster-together-mn/blob/main/AGENTS.md) (replace `your-org` with your Git host). If you use a **multi-root workspace**, open the sibling **`foster-together-mn`** folder and read `AGENTS.md` there.

## Before changing UI

1. Visual system: **`foster-together-mn`** [docs/mocks/DESIGN.md](https://github.com/your-org/foster-together-mn/blob/main/docs/mocks/DESIGN.md) and mock images under `docs/mocks/`.
2. **Agency epic** (Fetch, Zod, routes): [MVP1_LICENSING_AGENCY_CRUD.md](https://github.com/your-org/foster-together-mn/blob/main/docs/breakdown/MVP1_LICENSING_AGENCY_CRUD.md).

## Hard rules

- **No secrets in the bundle:** only public Cognito ids where applicable; API base URL via `VITE_*`.
- **HTTP:** **Fetch only** (no Axios); shared client in **`src/api/http.ts`**.
- **Zod / API shapes:** One module per resource under **`src/api/schemas/`** (e.g. `agency.ts`); parse API JSON with **`safeParse`** (or equivalent) before the UI uses it—add **`household.ts`**, **`person.ts`**, etc., as those APIs land.
- **PII and roles:** **Staff/admin** screens may show directory PII only when the API returns it for that user’s claims. **Volunteer** flows (e.g. event check-in) must use **volunteer-scoped** APIs and **narrow Zod schemas**—no full person/household objects. Hiding fields in React is **not** sufficient; if the payload includes PII, the design is wrong.

## Human implementer

The owner often implements application code themselves. Prefer **guidance and review** unless they explicitly ask you to implement (see docs repo `.cursor/rules/implementation.mdc`).
