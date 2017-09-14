<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Workshift extends Model
{
    protected $fillable = [
        'id',
        'name'
    ];

    public function details()
    {
        return $this->hasMany(Shift::class);
    }
}
