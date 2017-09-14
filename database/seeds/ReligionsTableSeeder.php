<?php

use Illuminate\Database\Seeder;
use App\Religion;

class ReligionsTableSeeder extends Seeder
{
    protected $religions = [
        [
            'id' => 1,
            'name' => 'Buddha'
        ],
        [
            'id' => 2,
            'name' => 'Hindu'
        ],
        [
            'id' => 3,
            'name' => 'Katolik'
        ],
        [
            'id' => 4,
            'name' => 'Islam'
        ],
        [
            'id' => 5,
            'name' => 'Protestan'
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->religions as $religion) {
            Religion::create($religion);
        }
    }
}
