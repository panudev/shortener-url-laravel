<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Url extends Model
{
    use HasFactory;

    protected $table = 'urls';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'original_url',
        'shortener_url',
        'clicks',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if(!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid()();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
