<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\Admin\AdminDashboardController;

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
    Route::get('/userlinks', [UrlController::class, 'userLinks'])->name('userlinks');
});

Route::get('/s/{shortCode}', [UrlController::class, 'redirectShort'])->name('short.redirect');

Route::get('/admin/login', function () {
    return Inertia::render('admin/login');
})->name('admin.login');

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'users'])->name('admin.dashboard');
    Route::get('/admin/users', [AdminDashboardController::class, 'users'])->name('admin.users');
    Route::get('/admin/users/{userId}/links', [AdminDashboardController::class, 'userLinks'])->name('admin.userlinks');
});

require __DIR__.'/auth.php';
