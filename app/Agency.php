<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $casts = [
        'id' => 'string'
    ];

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name'
    ];
}