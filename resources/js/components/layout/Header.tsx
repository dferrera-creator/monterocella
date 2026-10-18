import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/types';

interface Props {
    locale: Locale;
    localeUrls: { en: string; es: string };
    whatsappNumber: string;
}

const navLinks = {
    en: [
        { href: '#stays',     label: 'Stays' },
        { href: '#amenities', label: 'Amenities' },
        { href: '#location',  label: 'Location' },
        { href: '#faq',       label: 'FAQ' },
    ],
    es: [
        { href: '#stays',     label: 'Estancias' },
        { href: '#amenities', label: 'Amenidades' },
        { href: '#location',  label: 'Ubicación' },
        { href: '#faq',       label: 'Preguntas' },
    ],
};

export function Header({ locale, localeUrls, whatsappNumber }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const links = navLinks[locale];
    const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
    const altLocale = locale === 'en' ? 'es' : 'en';
    const altLabel = locale === 'en' ? 'Español' : 'English';

    return (
        <header
            className="fixed inset-x-0 top-0 z-50 transition-all duration-[var(--duration-base)]"
            style={{
                background: scrolled
                    ? 'var(--bg)'
                    : 'linear-gradient(to bottom, rgba(13,13,13,0.6), transparent)',
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
            }}
        >
            <div className="container flex items-center h-[var(--header-height)]">
                {/* Logo */}
                <Link href={locale === 'en' ? '/' : '/es'} className="flex-shrink-0 mr-auto">
                    <span className="font-display text-xl tracking-[0.06em]"
                          style={{ color: scrolled ? 'var(--fg)' : '#FFFFFF' }}>
                        Monte Rocella
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8 mr-8" aria-label="Main navigation">
                    {links.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className="text-sm tracking-wide transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                            style={{ color: scrolled ? 'var(--fg)' : 'rgba(255,255,255,0.85)' }}
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                {/* Locale switcher */}
                <a
                    href={localeUrls[altLocale]}
                    className="hidden md:block text-xs tracking-widest uppercase mr-6 transition-colors hover:text-[var(--accent)]"
                    style={{ color: scrolled ? 'var(--fg-muted)' : 'rgba(255,255,255,0.7)' }}
                >
                    {altLabel}
                </a>

                {/* Book Now CTA */}
                <Button
                    as="a"
                    href="#book"
                    variant="primary"
                    size="sm"
                    className="hidden md:inline-flex"
                >
                    {locale === 'en' ? 'Book Now' : 'Reservar'}
                </Button>

                {/* WhatsApp icon — mobile only */}
                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 md:hidden"
                    aria-label="WhatsApp"
                    style={{ color: scrolled ? 'var(--fg)' : '#FFFFFF' }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.845L.057 23.43c-.094.332.006.687.265.926.188.176.434.268.686.268.08 0 .162-.01.24-.032l5.75-1.489C8.568 23.67 10.253 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.714 0-3.374-.45-4.827-1.305L6.8 20.57l-3.534.915.915-3.446-.135-.213A9.96 9.96 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                </a>

                {/* Hamburger */}
                <button
                    className="ml-3 md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    style={{ color: scrolled ? 'var(--fg)' : '#FFFFFF' }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {mobileOpen
                            ? <path d="M6 18L18 6M6 6l12 12" />
                            : <path d="M3 12h18M3 6h18M3 18h18" />
                        }
                    </svg>
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <nav
                    className="md:hidden border-t py-6"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                    <div className="container flex flex-col gap-4">
                        {links.map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                className="text-base py-1 border-b hover:text-[var(--accent)] transition-colors"
                                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                                onClick={() => setMobileOpen(false)}
                            >
                                {label}
                            </a>
                        ))}
                        <a
                            href={localeUrls[altLocale]}
                            className="text-sm text-[var(--fg-muted)] uppercase tracking-widest mt-2"
                        >
                            {altLabel}
                        </a>
                        <Button as="a" href="#book" variant="primary" fullWidth>
                            {locale === 'en' ? 'Book Now' : 'Reservar'}
                        </Button>
                    </div>
                </nav>
            )}
        </header>
    );
}
