import { type PropsWithChildren } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BookingBar } from '@/components/booking/BookingBar';
import type { InertiaSharedData } from '@/types';

interface Props {
    title?: string;
    description?: string;
    showBookingBar?: boolean;
    /** hreflang alternate links for SEO */
    alternates?: { locale: string; url: string }[];
}

export function AppLayout({
    children,
    title,
    description,
    showBookingBar = true,
    alternates,
}: PropsWithChildren<Props>) {
    const { locale, currency, localeUrls, whatsappNumber } =
        usePage<{ props: InertiaSharedData }>().props as unknown as InertiaSharedData;

    const siteName = 'Monte Rocella';
    const fullTitle = title ? `${title} — ${siteName}` : siteName;

    return (
        <>
            <Head>
                <title>{fullTitle}</title>
                {description && <meta name="description" content={description} />}
                {/* Open Graph */}
                <meta property="og:title" content={fullTitle} />
                {description && <meta property="og:description" content={description} />}
                <meta property="og:type" content="website" />
                {/* hreflang for i18n */}
                {alternates?.map(({ locale: l, url }) => (
                    <link key={l} rel="alternate" hrefLang={l} href={url} />
                ))}
                <link rel="alternate" hrefLang="x-default" href={localeUrls.en} />
                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter+Tight:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex flex-col min-h-dvh">
                <Header
                    locale={locale}
                    localeUrls={localeUrls}
                    whatsappNumber={whatsappNumber}
                />

                <main className="flex-1 pt-[var(--header-height)]">
                    {children}
                </main>

                {showBookingBar && (
                    <BookingBar locale={locale} currency={currency} />
                )}

                <Footer locale={locale} whatsappNumber={whatsappNumber} />
            </div>
        </>
    );
}
