<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Calendar extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'status'
    ];
    protected $dates = ['deleted_at'];

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
