<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- SEO & Social --}}
        <meta name="robots" content="index, follow">
        <meta property="og:site_name" content="Monte Rocella">
        <meta property="og:locale" content="{{ app()->getLocale() === 'es' ? 'es_MX' : 'en_US' }}">
        <link rel="canonical" href="{{ url()->current() }}">

        {{-- Performance hints --}}
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <link rel="dns-prefetch" href="//www.googletagmanager.com">

        {{-- GTM head script (placeholder — inject real ID via env) --}}
        @if(config('monterocella.gtm_id'))
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{{ config('monterocella.gtm_id') }}');</script>
        @endif

        @inertiaHead
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="antialiased">
        {{-- GTM noscript --}}
        @if(config('monterocella.gtm_id'))
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ config('monterocella.gtm_id') }}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        @endif

        {{-- HubSpot tracking --}}
        @if(config('monterocella.hubspot_portal_id'))
        <script type="text/javascript" id="hs-script-loader" async defer
            src="//js.hs-scripts.com/{{ config('monterocella.hubspot_portal_id') }}.js"></script>
        @endif

        @inertia
    </body>
</html>
