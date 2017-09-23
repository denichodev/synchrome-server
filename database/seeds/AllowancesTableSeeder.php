<?php

use Illuminate\Database\Seeder;
use App\Allowance;

class AllowancesTableSeeder extends Seeder
{
    protected $allowances = [
        [
            'id' => 'E4B3',
            'name' => 'Eselon 4B Golongan 3',
            'tpp' => 3500000,
            'meal' => 20000
        ],
        [
            'id' => 'E4B4',
            'name' => 'Eselon 4B Golongan 4',
            'tpp' => 4000000,
            'meal' => 20000
        ],
        [
            'id' => 'FG2',
            'name' => 'Fungsional Guru Golongan II',
            'tpp' => 750000,
            'meal' => 20000
        ],
        [
            'id' => 'FG3',
            'name' => 'Fungsional Guru Golongan III',
            'tpp' => 850000,
            'meal' => 20000
        ],
        [
            'id' => 'FG4',
            'name' => 'Fungsional Guru Golongan IV',
            'tpp' => 1000000,
            'meal' => 20000
        ],
        [
            'id' => 'KS',
            'name' => 'Kepala Sekolah',
            'tpp' => 1500000,
            'meal' => 20000
        ],
        [
            'id' => 'TK1',
            'name' => 'Tenaga Kependidikan Golongan I',
            'tpp' => 900000,
            'meal' => 20000
        ],
        [
            'id' => 'TK2',
            'name' => 'Tenaga Kependidikan Golongan II',
            'tpp' => 950000,
            'meal' => 20000
        ],
        [
            'id' => 'TK3',
            'name' => 'Tenaga Kependidikan Golongan II',
            'tpp' => 1100000,
            'meal' => 20000
        ],
        [
            'id' => 'TK4',
            'name' => 'Tenaga Kependidikan Golongan IV',
            'tpp' => 1500000,
            'meal' => 20000
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->allowances as $allowance) {
            Allowance::create($allowance);
        }
    }
}
