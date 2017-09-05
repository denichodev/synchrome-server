<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Workshift extends Model
{
    protected $fillable = [
        'name',
        'in',
        'out'
    ];
}
