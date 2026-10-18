import type {
    BookingEngineAdapter,
    AvailabilityResult,
    BookingContext,
    Currency,
    DateRange,
    GuestCount,
    PriceQuote,
} from '@/types/booking';

const TAX_RATE = 0.21; // IVA 16% + ISH 5%

const MOCK_RATES: Record<string, number> = {
    '1br':       350,
    '2br':       550,
    '3br':       750,
    penthouse:  1200,
};

function nightsBetween(checkIn: string, checkOut: string): number {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    return Math.max(1, Math.round((d2.getTime() - d1.getTime()) / 86_400_000));
}

export class MockBookingAdapter implements BookingEngineAdapter {
    async getAvailability(
        _stayId: string,
        range: DateRange,
        _guests: GuestCount,
    ): Promise<AvailabilityResult> {
        await new Promise(r => setTimeout(r, 250));
        const nights = nightsBetween(range.checkIn, range.checkOut);
        return { available: nights >= 2, minNights: 2 };
    }

    async getQuote(
        stayId: string,
        range: DateRange,
        _guests: GuestCount,
        currency: Currency,
    ): Promise<PriceQuote | null> {
        await new Promise(r => setTimeout(r, 300));

        const stayType = stayId.split('-')[0] ?? '1br';
        const baseRateUsd = MOCK_RATES[stayType] ?? MOCK_RATES['1br']!;
        const baseRate = currency === 'MXN' ? baseRateUsd * 17.5 : baseRateUsd;
        const totalNights = nightsBetween(range.checkIn, range.checkOut);
        const subtotal = baseRate * totalNights;
        const cleaningFee = currency === 'MXN' ? 1_750 : 100;
        const taxes = Math.round(subtotal * TAX_RATE * 100) / 100;
        const total = subtotal + taxes + cleaningFee;

        return {
            stayId,
            currency,
            baseRate,
            totalNights,
            subtotal,
            taxRate: TAX_RATE,
            taxes,
            cleaningFee,
            total,
            breakdown: [
                { label: `${currency === 'MXN' ? 'Tarifa' : 'Rate'} × ${totalNights} nights`, amount: subtotal, type: 'rate' },
                { label: 'IVA + ISH (21%)', amount: taxes, type: 'tax' },
                { label: currency === 'MXN' ? 'Limpieza' : 'Cleaning', amount: cleaningFee, type: 'fee' },
            ],
        };
    }

    getCheckoutUrl(context: BookingContext): string {
        const base = 'https://delmar-monterocella.guestybookings.com';
        const params = new URLSearchParams();
        if (context.stayId) params.set('listingId', context.stayId);
        if (context.dateRange) {
            params.set('checkIn', context.dateRange.checkIn);
            params.set('checkOut', context.dateRange.checkOut);
        }
        if (context.guests) params.set('guests', String(context.guests.adults));
        return `${base}?${params.toString()}`;
    }
}
