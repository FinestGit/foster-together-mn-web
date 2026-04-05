/** Vite injects env at build time; keep in sync with `import.meta.env` usage. */
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
