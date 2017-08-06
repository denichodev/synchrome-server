<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title',
        'start',
        'end',
        'is_weekday',
        'num_of_day',
        'event_category_id'
    ];
    protected $dates = [
        'deleted_at'
    ];

    public function category()
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }
}
