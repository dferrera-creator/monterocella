<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| English routes (default, no prefix)
|--------------------------------------------------------------------------
*/
Route::middleware(['setLocale', 'shareInertia'])->group(function () {
    Route::get('/', [HomeController::class, 'en'])->name('home.en');
    Route::get('/privacy', fn () => inertia('en/Privacy'))->name('privacy.en');
    Route::get('/terms',   fn () => inertia('en/Terms'))->name('terms.en');
});

/*
|--------------------------------------------------------------------------
| Spanish routes (/es prefix)
|--------------------------------------------------------------------------
*/
Route::prefix('es')->middleware(['setLocale', 'shareInertia'])->name('es.')->group(function () {
    Route::get('/',        [HomeController::class, 'es'])->name('home');
    Route::get('/privacy', fn () => inertia('es/Privacy'))->name('privacy');
    Route::get('/terms',   fn () => inertia('es/Terms'))->name('terms');
});
