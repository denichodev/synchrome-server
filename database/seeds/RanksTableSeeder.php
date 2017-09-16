<?php

use Illuminate\Database\Seeder;
use App\Rank;

class RanksTableSeeder extends Seeder
{
    protected $ranks = [
        [
            'id' => '1A',
            'name' => 'Juru Muda',
            'allowance' => 2000000,
            'meal_allowance' => 20000
        ],
        [
            'id' => '1B',
            'name' => 'Juru Muda Tingkat I',
            'allowance' => 2000000,
            'meal_allowance' => 20000
        ],
        [
            'id' => '1C',
            'name' => 'Juru',
            'allowance' => 2000000,
            'meal_allowance' => 20000
        ],
        [
            'id' => '1D',
            'name' => 'Juru Tingkat I',
            'allowance' => 2000000,
            'meal_allowance' => 20000
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->ranks as $rank) {
            Rank::create($rank);
        }
    }
}
