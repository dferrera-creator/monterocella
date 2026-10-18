export type Currency = 'USD' | 'MXN';
export type Locale = 'en' | 'es';

export interface DateRange {
    checkIn: string;   // ISO 8601 date string (YYYY-MM-DD)
    checkOut: string;
}

export interface GuestCount {
    adults: number;
    children?: number;
    infants?: number;
}

export interface BookingContext {
    stayId?: string;
    dateRange?: DateRange;
    guests?: GuestCount;
    currency: Currency;
    locale: Locale;
}

export interface AvailabilityResult {
    available: boolean;
    minNights?: number;
    nextAvailableCheckIn?: string;
}

export interface PriceQuote {
    stayId: string;
    currency: Currency;
    baseRate: number;       // per night
    totalNights: number;
    subtotal: number;
    taxRate: number;        // combined IVA 16% + ISH 5%
    taxes: number;
    cleaningFee: number;
    total: number;
    breakdown: PriceLineItem[];
}

export interface PriceLineItem {
    label: string;
    amount: number;
    type: 'rate' | 'tax' | 'fee' | 'discount';
}

export interface Stay {
    id: string;
    slug: string;
    type: '1br' | '2br' | '3br' | 'penthouse';
    view: 'garden' | 'ocean' | 'panoramic';
    title: string;
    titleEs: string;
    interiorSqm: number;
    terraceSqm: number;
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    amenities: string[];
    images: string[];
    startingRateUsd?: number;
}

export interface BookingEngineAdapter {
    getAvailability(
        stayId: string,
        range: DateRange,
        guests: GuestCount,
    ): Promise<AvailabilityResult>;

    getQuote(
        stayId: string,
        range: DateRange,
        guests: GuestCount,
        currency: Currency,
    ): Promise<PriceQuote | null>;

    getCheckoutUrl(context: BookingContext): string;

    /** Called after the search widget mounts into a DOM container */
    mountSearchWidget?(containerId: string, context: BookingContext): void;
}
