<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shift extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'workshift_id',
        'day',
        'in',
        'out'
    ];

    protected $dates = [
        'deleted_at'
    ];
}