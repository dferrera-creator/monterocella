<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareInertiaData
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale   = app()->getLocale();
        $currency = $this->detectCurrency($request);

        Inertia::share([
            'locale'   => $locale,
            'currency' => $currency,
            'localeUrls' => [
                'en' => url('/'),
                'es' => url('/es'),
            ],
            'whatsappNumber' => config('monterocella.whatsapp_number', '+52-624-000-0000'),
        ]);

        return $next($request);
    }

    private function detectCurrency(Request $request): string
    {
        // Explicit override via query param or session
        if ($request->has('currency')) {
            $c = strtoupper($request->input('currency'));
            if (in_array($c, ['USD', 'MXN'], true)) {
                session(['currency' => $c]);
                return $c;
            }
        }

        if (session()->has('currency')) {
            return session('currency');
        }

        // Geo-detect: if locale is Spanish → default MXN for domestic visitors
        if (app()->getLocale() === 'es') {
            return 'MXN';
        }

        return 'USD';
    }
}
