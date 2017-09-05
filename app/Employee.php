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
        'echelon_id',
        'workshift_id'
    ];

    protected $hidden = [
        'echelon_id',
        'workshift_id'
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function echelon()
    {
        return $this->belongsTo(Echelon::class);
    }

    public function templates()
    {
        return $this->hasMany(Template::class);
    }

    public function workshift()
    {
        return $this->belongsTo(Workshift::class);
    }
}
