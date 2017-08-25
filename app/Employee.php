<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $casts = [
        'id' => 'string'
    ];
    
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'echelon_id'
    ];

    public function echelon()
    {
        return $this->belongsTo(Echelon::class);
    }
}
