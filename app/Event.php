<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'start',
        'end',
        'isWeekday',
        'numOfDay',
        'event_category_id'
    ];

    public function category()
    {
        return $this->belongsTo(EventCategory::class);
    }
}
