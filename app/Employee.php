<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    protected $casts = [
        'id' => 'string'
    ];
    
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'echelon_id'
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function echelon()
    {
        return $this->belongsTo(Echelon::class);
    }
}
