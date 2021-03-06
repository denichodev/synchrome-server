<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Allowance extends Model
{
    use SoftDeletes;

    protected $casts = [
        'id' => 'string',
        'tpp' => 'double',
        'meal' => 'double'
    ];

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'tpp',
        'meal'
    ];
}
