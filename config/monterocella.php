<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Monte Rocella Site Configuration
    |--------------------------------------------------------------------------
    */

    'whatsapp_number' => env('WHATSAPP_NUMBER', '+52-624-000-0000'),

    // Analytics
    'gtm_id'              => env('GTM_ID'),
    'ga4_measurement_id'  => env('GA4_MEASUREMENT_ID'),
    'hubspot_portal_id'   => env('HUBSPOT_PORTAL_ID'),
    'clarity_project_id'  => env('CLARITY_PROJECT_ID'),

    // Booking engine
    'guesty_widget_id'    => env('GUESTY_WIDGET_ID', 'IO312PWQ'),
    'guesty_site_url'     => env('GUESTY_SITE_URL', 'delmar-monterocella.guestybookings.com'),

    // Currency conversion
    'banxico_api_key'     => env('BANXICO_API_KEY'),

    // Feature flags
    'booking_engine'      => env('VITE_BOOKING_ENGINE', 'mock'), // 'mock' | 'guesty'

    // Minimum stay (nights)
    'min_stay_nights'     => (int) env('MIN_STAY_NIGHTS', 2),

    // Tax rates
    'iva_rate'   => 0.16,  // 16% IVA
    'ish_rate'   => 0.05,  // 5% ISH (Baja California Sur)
];
