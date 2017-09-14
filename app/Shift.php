<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $fillable = [
        'workshift_id',
        'day',
        'in',
        'out'
    ];
}