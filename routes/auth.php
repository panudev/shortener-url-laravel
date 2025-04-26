<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserRegisterController;
use App\Http\Controllers\Auth\UserLoginController;
use App\Http\Controllers\Auth\AdminLoginController;

Route::middleware('guest')->group(function () {
    Route::get('/register', [UserRegisterController::class, 'create'])->name('register');
    Route::post('/register', [UserRegisterController::class, 'store']);

    Route::get('/login', [UserLoginController::class, 'create'])->name('login');
    Route::post('/login', [UserLoginController::class, 'store']);

    Route::get('/admin/login', [AdminLoginController::class, 'create'])->name('admin.login');
    Route::post('/admin/login', [AdminLoginController::class, 'store']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserLoginController::class, 'destroy'])->middleware('auth')->name('logout');
});

Route::middleware(['auth:admin'])->group(function () {
    Route::post('/admin/logout', [AdminLoginController::class, 'destroy'])->name('admin.logout');
});

