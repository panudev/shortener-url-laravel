<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Url;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function dashboard()
    {
        $links = Url::with('user')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($link) {
                return [
                    'id' => $link->id,
                    'original_url' => $link->original_url,
                    'shortener_url' => $link->shortener_url,
                    'username' => $link->user->username ?? 'N/A',
                    'clicks' => $link->clicks,
                    'created_at' => $link->created_at,
                ];
            });

        return Inertia::render('admin/dashboard', [
            'links' => $links,
            'auth' => [
                'admin' => Auth::guard('admin')->user(),
            ],
        ]);
    }

    public function users()
    {
        $users = User::orderByDesc('created_at')->paginate(10); 
        return Inertia::render('admin/dashboard', [
            'users' => $users,
        ]);
    }

    public function userLinks($userId)
    {
        $user = User::findOrFail($userId);
        $links = Url::where('user_id', $userId)->orderByDesc('created_at')->paginate(10);
        return Inertia::render('admin/userlinks', [
            'user' => $user,
            'links' => $links,
        ]);
    }
}
