import { MockBookingAdapter } from './MockAdapter';
import { GuestyWidgetAdapter } from './GuestyWidgetAdapter';
import type { BookingEngineAdapter } from '@/types/booking';

const ENGINE = (import.meta.env.VITE_BOOKING_ENGINE ?? 'mock') as 'mock' | 'guesty';

export function createBookingAdapter(): BookingEngineAdapter {
    if (ENGINE === 'guesty') return new GuestyWidgetAdapter();
    return new MockBookingAdapter();
}

export { MockBookingAdapter, GuestyWidgetAdapter };
export type { BookingEngineAdapter };
