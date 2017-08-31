<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'template',
        'index',
        'alg_ver',
        'employee_id'
    ];

    protected $hidden = [
        'employee_id'
    ];
}
