export * from './booking';

export interface PageProps {
    locale: 'en' | 'es';
    currency: 'USD' | 'MXN';
    /** Inertia shared props */
    auth?: { user?: { id: number; email: string } };
    flash?: { success?: string; error?: string };
}

export interface InertiaSharedData {
    locale: 'en' | 'es';
    currency: 'USD' | 'MXN';
    localeUrls: { en: string; es: string };
    whatsappNumber: string;
}
