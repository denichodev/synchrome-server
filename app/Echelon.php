<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Echelon extends Model
{
    protected $casts = [
        'id' => 'string'
    ];

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'supervisor_id',
        'agency_id'
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function subordinates()
    {
        return $this->hasMany(Echelon::class, 'supervisor_id', 'id');
    }
}