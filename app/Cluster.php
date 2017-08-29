<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cluster extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name'
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function keys()
    {
        return $this->hasMany(Key::class);
    }

    public function activeKey()
    {
        return $this->keys()
            ->where('status', true)
            ->first();
    }
}
