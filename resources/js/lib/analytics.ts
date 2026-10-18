/**
 * Monte Rocella — Analytics Event Schema
 *
 * All events fire through dataLayer (GTM) → GA4.
 * HubSpot tracking is loaded separately via _hsq.
 * Microsoft Clarity is loaded via GTM tag.
 */

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
        _hsq: [string, ...unknown[]][];
    }
}

type Locale = 'en' | 'es';
type Currency = 'USD' | 'MXN';

// ─── Event catalogue ──────────────────────────────────────────────────────

export type AnalyticsEvent =
    | { event: 'page_view';              locale: Locale; path: string }
    | { event: 'search_initiated';       check_in: string; check_out: string; guests: number; locale: Locale }
    | { event: 'availability_returned';  stay_id: string; available: boolean; nights: number }
    | { event: 'quote_viewed';           stay_id: string; total: number; currency: Currency; nights: number }
    | { event: 'checkout_started';       stay_id: string; total: number; currency: Currency; nights: number }
    | { event: 'booking_completed';      stay_id: string; total: number; currency: Currency; nights: number; booking_ref: string }
    | { event: 'stay_card_clicked';      stay_id: string; stay_type: string; position: number }
    | { event: 'stay_image_gallery_opened'; stay_id: string }
    | { event: 'whatsapp_clicked';       source: string; locale: Locale }
    | { event: 'locale_switched';        from: Locale; to: Locale }
    | { event: 'currency_switched';      from: Currency; to: Currency }
    | { event: 'amenity_section_viewed'; section: string }
    | { event: 'faq_expanded';           question_id: string; locale: Locale }
    | { event: 'map_interaction';        type: 'zoom' | 'pan' | 'poi_click'; poi?: string }
    | { event: 'stay_matcher_completed'; recommendation: string; steps: number }
    | { event: 'price_bar_viewed';       stay_id: string; nights: number }
    | { event: 'direct_perk_seen';       perk: string };

// ─── Push to GTM dataLayer ────────────────────────────────────────────────

export function track(evt: AnalyticsEvent): void {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(evt as Record<string, unknown>);
}

// ─── HubSpot identify / track page ───────────────────────────────────────

export function hubspotTrackPage(): void {
    if (typeof window === 'undefined') return;
    window._hsq = window._hsq ?? [];
    window._hsq.push(['setPath', window.location.pathname]);
    window._hsq.push(['trackPageView']);
}

export function hubspotIdentify(email: string, props?: Record<string, string>): void {
    if (typeof window === 'undefined') return;
    window._hsq = window._hsq ?? [];
    window._hsq.push(['identify', { email, ...props }]);
}

// ─── Clarity masking hint ─────────────────────────────────────────────────
// Fields with data-clarity-mask="true" are blurred in session recordings.
// Applied at component level via the attribute, no JS call needed here.
