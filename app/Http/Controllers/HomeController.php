<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function en(): Response
    {
        return Inertia::render('en/Home');
    }

    public function es(): Response
    {
        return Inertia::render('es/Home');
    }
}
