<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    protected $fillable = [
        'key',
        'status',
        'cluster_id'
    ];

    public function cluster()
    {
        return $this->belongsTo(Cluster::class);
    }

    public static function generate()
    {
        $key = str_random(32);

        if (Key::where('key', $key)->count() > 0) {
            return self::generate();
        }

        return $key;
    }

    public static function isValid($key)
    {
        if (is_null(Key::where(['key' => $key, 'status' => true])->first())) {
            return false;
        }

        return true;
    }

    public static function findByKey($key)
    {
        return Key::where('key', $key)->first();
    }
}
