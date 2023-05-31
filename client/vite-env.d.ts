/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_USER: string;
  readonly VITE_BASE_URL_PALETTE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

