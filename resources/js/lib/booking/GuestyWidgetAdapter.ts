/**
 * Guesty Search Bar Widget adapter.
 *
 * The Guesty widget loads its own UI into the container div.
 * We own the date/guest inputs on our side; the widget handles
 * availability calendars and flows through to checkout on
 * delmar-monterocella.guestybookings.com.
 *
 * Widget ID:   IO312PWQ
 * JS source:   https://s3.amazonaws.com/guesty-frontend-production/search-bar-production.js
 * CSS source:  https://s3.amazonaws.com/guesty-frontend-production/search-bar-production.css
 * Brand color: #b8976a (Guesty override — matches our --color-sand)
 */

import type {
    BookingEngineAdapter,
    AvailabilityResult,
    BookingContext,
    Currency,
    DateRange,
    GuestCount,
    PriceQuote,
} from '@/types/booking';

const GUESTY_SITE_URL = 'delmar-monterocella.guestybookings.com';
const GUESTY_WIDGET_ID = 'IO312PWQ';
const GUESTY_BRAND_COLOR = '#b8976a';

declare global {
    interface Window {
        GuestySearchBarWidget?: {
            init: (config: {
                widgetId: string;
                containerId: string;
                siteUrl: string;
                color: string;
                checkIn?: string;
                checkOut?: string;
                guests?: number;
            }) => void;
        };
    }
}

function loadGuestyAssets(): Promise<void> {
    return new Promise((resolve) => {
        if (window.GuestySearchBarWidget) { resolve(); return; }

        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://s3.amazonaws.com/guesty-frontend-production/search-bar-production.css';
        document.head.appendChild(css);

        const js = document.createElement('script');
        js.src = 'https://s3.amazonaws.com/guesty-frontend-production/search-bar-production.js';
        js.onload = () => resolve();
        document.head.appendChild(js);
    });
}

export class GuestyWidgetAdapter implements BookingEngineAdapter {
    async getAvailability(
        _stayId: string,
        _range: DateRange,
        _guests: GuestCount,
    ): Promise<AvailabilityResult> {
        // The Guesty widget handles availability display internally.
        // We return a permissive result; the widget blocks invalid dates.
        return { available: true };
    }

    async getQuote(
        _stayId: string,
        _range: DateRange,
        _guests: GuestCount,
        _currency: Currency,
    ): Promise<PriceQuote | null> {
        // Guesty pricing surfaces within the widget and on the booking site.
        // Detailed quotes are not available via widget-only integration.
        return null;
    }

    getCheckoutUrl(context: BookingContext): string {
        const params = new URLSearchParams();
        if (context.dateRange) {
            params.set('checkIn', context.dateRange.checkIn);
            params.set('checkOut', context.dateRange.checkOut);
        }
        if (context.guests) params.set('guests', String(context.guests.adults));
        if (context.stayId) params.set('listingId', context.stayId);
        const qs = params.toString();
        return `https://${GUESTY_SITE_URL}${qs ? `?${qs}` : ''}`;
    }

    async mountSearchWidget(containerId: string, context: BookingContext): Promise<void> {
        await loadGuestyAssets();
        const initParams: Parameters<NonNullable<typeof window.GuestySearchBarWidget>['init']>[0] = {
            widgetId:    GUESTY_WIDGET_ID,
            containerId,
            siteUrl:     GUESTY_SITE_URL,
            color:       GUESTY_BRAND_COLOR,
        };
        if (context.dateRange?.checkIn)  initParams.checkIn  = context.dateRange.checkIn;
        if (context.dateRange?.checkOut) initParams.checkOut = context.dateRange.checkOut;
        if (context.guests?.adults)      initParams.guests   = context.guests.adults;
        window.GuestySearchBarWidget?.init(initParams);
    }
}
