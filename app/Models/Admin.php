<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $table = 'admins';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'username',
        'password',
        'name',
        'role',
        'created_by',
        'updated_by',
    ];

    protected $guarded = [];
    protected $hidden = ['password'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if(!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid()();
            }
        });
    }

    public function createdBy()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(Admin::class, 'updated_by');
    }
}
