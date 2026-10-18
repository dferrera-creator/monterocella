import { Link } from '@inertiajs/react';
import type { Locale } from '@/types';

interface Props {
    locale: Locale;
    whatsappNumber: string;
    year?: number;
}

export function Footer({ locale, whatsappNumber, year = new Date().getFullYear() }: Props) {
    const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
    const isEn = locale === 'en';

    const links = {
        quick: [
            { href: '#stays',     label: isEn ? 'Stays' : 'Estancias' },
            { href: '#amenities', label: isEn ? 'Amenities' : 'Amenidades' },
            { href: '#location',  label: isEn ? 'Location' : 'Ubicación' },
            { href: '#faq',       label: isEn ? 'FAQ' : 'Preguntas frecuentes' },
        ],
        legal: [
            { href: `/${locale === 'es' ? 'es/' : ''}privacy`, label: isEn ? 'Privacy Policy' : 'Privacidad' },
            { href: `/${locale === 'es' ? 'es/' : ''}terms`,   label: isEn ? 'Terms' : 'Términos' },
        ],
    };

    return (
        <footer style={{ background: 'var(--color-obsidian)', color: '#EDE8DF' }}>
            {/* Top bar — direct booking CTA */}
            <div style={{ background: 'var(--accent)' }}>
                <div className="container py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <span className="font-display text-xl text-[var(--color-obsidian)]">
                        {isEn ? 'Better rates. More perks. Direct.' : 'Mejor precio. Más beneficios. Directo.'}
                    </span>
                    <a
                        href="#book"
                        className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium"
                        style={{ background: 'var(--color-obsidian)', color: '#EDE8DF', textDecoration: 'none' }}
                    >
                        {isEn ? 'Book Direct' : 'Reservar directo'}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Main footer grid */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand column */}
                    <div>
                        <p className="font-display text-2xl tracking-[0.06em] mb-4" style={{ color: 'var(--accent)' }}>
                            Monte Rocella
                        </p>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(237,232,223,0.65)' }}>
                            {isEn
                                ? 'Luxury residences in Los Cabos — where the Pacific meets the desert.'
                                : 'Residencias de lujo en Los Cabos — donde el Pacífico se encuentra con el desierto.'}
                        </p>
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors"
                            style={{ background: '#25D366', color: '#FFFFFF' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.845L.057 23.43a.75.75 0 00.95.95l5.75-1.469A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.714 0-3.374-.45-4.827-1.305l-.374-.224-3.534.915.915-3.446-.213-.335A9.96 9.96 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                            </svg>
                            {isEn ? 'Chat with us' : 'Escríbenos'}
                        </a>
                    </div>

                    {/* Quick links */}
                    <div>
                        <p className="text-xs tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--accent)' }}>
                            {isEn ? 'Quick Links' : 'Accesos rápidos'}
                        </p>
                        <ul className="flex flex-col gap-3">
                            {links.quick.map(({ href, label }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: 'rgba(237,232,223,0.65)', textDecoration: 'none' }}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-xs tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--accent)' }}>
                            {isEn ? 'Contact' : 'Contacto'}
                        </p>
                        <div className="flex flex-col gap-3 text-sm" style={{ color: 'rgba(237,232,223,0.65)' }}>
                            <span>Cabo San Lucas, BCS, México</span>
                            <span>
                                {isEn ? 'Managed by ' : 'Gestionado por '}
                                <a
                                    href="https://delmarboutique.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    style={{ color: 'var(--accent)', textDecoration: 'none' }}
                                >
                                    Del Mar Boutique
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(237,232,223,0.1)' }}>
                <div className="container py-5 flex flex-col sm:flex-row sm:items-center gap-3 text-xs"
                     style={{ color: 'rgba(237,232,223,0.4)' }}>
                    <span>© {year} Monte Rocella. {isEn ? 'All rights reserved.' : 'Todos los derechos reservados.'}</span>
                    <div className="sm:ml-auto flex gap-4">
                        {links.legal.map(({ href, label }) => (
                            <Link key={href} href={href} className="hover:text-white transition-colors">
                                {label}
                            </Link>
                        ))}
                    </div>
                    {/* Locale switcher */}
                    <Link
                        href={locale === 'en' ? '/es' : '/'}
                        className="hover:text-white transition-colors uppercase tracking-wider"
                    >
                        {locale === 'en' ? 'ES' : 'EN'}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
