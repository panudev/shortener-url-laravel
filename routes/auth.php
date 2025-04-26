<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserRegisterController;
use App\Http\Controllers\Auth\UserLoginController;

Route::middleware('guest')->group(function () {
    Route::get('/register', [UserRegisterController::class, 'create'])->name('register');
    Route::post('/register', [UserRegisterController::class, 'store']);

    Route::get('/login', [UserLoginController::class, 'create'])->name('login');
    Route::post('/login', [UserLoginController::class, 'store']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserLoginController::class, 'destroy'])->middleware('auth')->name('logout');
});
