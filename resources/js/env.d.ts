/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BOOKING_ENGINE: 'mock' | 'guesty';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
