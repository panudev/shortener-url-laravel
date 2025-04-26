<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UrlController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/urls', function () {
        return Inertia::render('dashboard');
    })->name('urls.index');
    Route::post('/urls', [UrlController::class, 'store'])->name('urls.store');
});

require __DIR__.'/auth.php';
