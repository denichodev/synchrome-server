<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cluster extends Model
{
    protected $fillable = [
        'name'
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
