<?php

use Illuminate\Database\Seeder;
use App\Rank;

class RanksTableSeeder extends Seeder
{
    protected $ranks = [
        [
            'id' => '1A',
            'name' => 'Juru Muda'
        ],
        [
            'id' => '1B',
            'name' => 'Juru Muda Tingkat I'
        ],
        [
            'id' => '1C',
            'name' => 'Juru'
        ],
        [
            'id' => '1D',
            'name' => 'Juru Tingkat I'
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
