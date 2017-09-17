<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rank extends Model
{
    use SoftDeletes;

    protected $casts = [
        'id' => 'string',
        'allowance' => 'double',
        'meal_allowance' => 'double'
    ];

    protected $fillable = [
        'id',
        'name',
        'allowance',
        'meal_allowance'
    ];

    protected $hidden = [
        'pivot'
    ];
}
