<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AbsenceType extends Model
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
