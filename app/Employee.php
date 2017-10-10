<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    protected $casts = [
        'id' => 'string',
        'married' => 'boolean'
    ];
    
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'echelon_id',
        'workshift_id',
        'religion_id',
        'gender',
        'married',
        'address',
        'phone',
        'allowance_id',
        'calendar_id'
    ];

    protected $hidden = [
        'echelon_id',
        'workshift_id',
        'religion_id',
        'deleted_at',
        'allowance_id',
        'calendar_id'
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

    public function religion()
    {
        return $this->belongsTo(Religion::class);
    }

    public function rankHistory()
    {
        return $this->belongsToMany(Rank::class, 'rank_histories');
    }

    public function currentRank()
    {
        return $this->rankHistory()->orderBy('rank_histories.created_at', 'DESC')->first();
    }

    public function allowance()
    {
        return $this->belongsTo(Allowance::class);
    }

    public function calendar()
    {
        return $this->belongsTo(Calendar::class);
    }
}
