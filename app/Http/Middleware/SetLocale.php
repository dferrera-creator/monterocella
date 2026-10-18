<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public const SUPPORTED = ['en', 'es'];

    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->segment(1);

        if (in_array($locale, self::SUPPORTED, true)) {
            app()->setLocale($locale);
        } else {
            app()->setLocale('en');
        }

        return $next($request);
    }
}
