<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgencyType extends Model
{
    protected $fillable = [
        'id',
        'name',
    ];

    public $timestamps = false;
}