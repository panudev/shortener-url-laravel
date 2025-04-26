<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Url;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;

class UrlController extends Controller
{
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        $validated = $request->validate([
            'url' => 'required|url',
            'want_qr' => 'boolean',
        ]);

        $urlRecord = Url::where('user_id', Auth::id())
            ->where('original_url', $validated['url'])
            ->first();

        if (!$urlRecord) {
            $shortCode = Str::random(6);
            $shortUrl = url('/s/' . $shortCode);

            $urlRecord = Url::create([
                'id' => (string) Str::uuid(),
                'user_id' => Auth::user()->id,
                'original_url' => $validated['url'],
                'shortener_url' => $shortUrl,
                'clicks' => 0,
            ]);
        } else {
            $shortUrl = $urlRecord->shortener_url;
        }

        $qrUrl = null;
        if ($validated['want_qr']) {
            $shortCode = basename($shortUrl);
            $qrImageName = 'qrcodes/' . Auth::user()->id . '/' . $shortCode . '.png';
            $qrContent = $shortUrl;
            $qr = QrCode::format('png')->size(300)->generate($qrContent);
            Storage::disk('public')->put($qrImageName, $qr);
            $urlRecord->update(['qrcode' => $qrImageName]);
            $qrUrl = asset('storage/' . $qrImageName);
        }

        return Inertia::render('dashboard', [
            'result' => [
                'short_url' => $shortUrl,
                'qr_url' => $qrUrl,
            ],
        ]);
    }

    public function userLinks()
    {
        $links = Url::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->paginate(10, ['id', 'original_url', 'shortener_url', 'qrcode', 'clicks', 'created_at']);

        return Inertia::render('userlinks', [
            'links' => $links,
        ]);
    }

    public function redirectShort($shortCode)
    {
        $url = Url::where('shortener_url', 'like', '%/' . $shortCode)->first();

        if ($url) {
            $url->increment('clicks');
            return redirect()->away($url->original_url);
        } else {
            abort(404, 'Short link not found');
        }
    }
}
