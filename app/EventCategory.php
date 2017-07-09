<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventCategory extends Model
{
    protected $fillable = [
        'name',
        'color',
        'textColor'
    ];
    public $timestamps = false;

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
