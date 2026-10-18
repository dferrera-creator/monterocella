import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { track } from '@/lib/analytics';
import { createBookingAdapter } from '@/lib/booking';
import type { Currency, Locale } from '@/types';

interface Props {
    locale: Locale;
    currency: Currency;
    stayId?: string;
}

const adapter = createBookingAdapter();

function formatDate(iso: string, locale: Locale): string {
    if (!iso) return '';
    return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
        month: 'short',
        day: 'numeric',
    }).format(new Date(iso + 'T00:00:00'));
}

export function BookingBar({ locale, currency, stayId }: Props) {
    const [checkIn, setCheckIn]   = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests]     = useState(2);

    const isEn = locale === 'en';
    const canSearch = checkIn && checkOut;

    const handleSearch = useCallback(async () => {
        if (!canSearch) return;

        track({
            event: 'search_initiated',
            check_in: checkIn,
            check_out: checkOut,
            guests,
            locale,
        });

        const ctx: Parameters<typeof adapter.getCheckoutUrl>[0] = {
            currency,
            locale,
            dateRange: { checkIn, checkOut },
            guests: { adults: guests },
        };
        if (stayId) ctx.stayId = stayId;
        const url = adapter.getCheckoutUrl(ctx);

        if (stayId) {
            track({ event: 'checkout_started', stay_id: stayId, total: 0, currency, nights: 0 });
        }

        window.open(url, '_blank', 'noopener,noreferrer');
    }, [checkIn, checkOut, guests, currency, locale, stayId, canSearch]);

    return (
        <div
            id="book"
            className="sticky bottom-0 z-40 border-t"
            style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: '0 -4px 24px rgba(13,13,13,0.08)',
            }}
        >
            <div className="container">
                <div className="flex flex-wrap items-center gap-3 py-3">
                    {/* Check-in */}
                    <label className="flex flex-col min-w-[120px] flex-1">
                        <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--fg-muted)] mb-0.5">
                            {isEn ? 'Check-in' : 'Llegada'}
                        </span>
                        <input
                            type="date"
                            value={checkIn}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setCheckIn(e.target.value)}
                            className="text-sm bg-transparent border-0 p-0 text-[var(--fg)] focus:outline-none cursor-pointer"
                            aria-label={isEn ? 'Check-in date' : 'Fecha de llegada'}
                            data-clarity-mask="true"
                        />
                        {checkIn && (
                            <span className="text-xs text-[var(--fg-muted)]">{formatDate(checkIn, locale)}</span>
                        )}
                    </label>

                    <div className="w-px h-8 bg-[var(--border)] hidden sm:block" aria-hidden />

                    {/* Check-out */}
                    <label className="flex flex-col min-w-[120px] flex-1">
                        <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--fg-muted)] mb-0.5">
                            {isEn ? 'Check-out' : 'Salida'}
                        </span>
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            onChange={e => setCheckOut(e.target.value)}
                            className="text-sm bg-transparent border-0 p-0 text-[var(--fg)] focus:outline-none cursor-pointer"
                            aria-label={isEn ? 'Check-out date' : 'Fecha de salida'}
                            data-clarity-mask="true"
                        />
                        {checkOut && (
                            <span className="text-xs text-[var(--fg-muted)]">{formatDate(checkOut, locale)}</span>
                        )}
                    </label>

                    <div className="w-px h-8 bg-[var(--border)] hidden sm:block" aria-hidden />

                    {/* Guests */}
                    <label className="flex flex-col min-w-[80px]">
                        <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--fg-muted)] mb-0.5">
                            {isEn ? 'Guests' : 'Huéspedes'}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setGuests(g => Math.max(1, g - 1))}
                                className="w-6 h-6 rounded-full border text-sm flex items-center justify-center hover:border-[var(--accent)] transition-colors"
                                style={{ borderColor: 'var(--border)' }}
                                aria-label={isEn ? 'Remove guest' : 'Quitar huésped'}
                            >−</button>
                            <span className="text-sm w-4 text-center">{guests}</span>
                            <button
                                onClick={() => setGuests(g => Math.min(12, g + 1))}
                                className="w-6 h-6 rounded-full border text-sm flex items-center justify-center hover:border-[var(--accent)] transition-colors"
                                style={{ borderColor: 'var(--border)' }}
                                aria-label={isEn ? 'Add guest' : 'Agregar huésped'}
                            >+</button>
                        </div>
                    </label>

                    {/* Search CTA */}
                    <Button
                        onClick={handleSearch}
                        disabled={!canSearch}
                        variant="primary"
                        size="md"
                        className="flex-shrink-0 ml-auto"
                    >
                        {isEn ? 'Check Availability' : 'Ver disponibilidad'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
