<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workshift extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'name'
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function details()
    {
        return $this->hasMany(Shift::class);
    }

    public function isSaturdayWorkday()
    {
        return $this->details->where('day', 'Sat')->count() === 1;
    }
}
