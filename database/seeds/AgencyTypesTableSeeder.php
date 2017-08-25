<?php

use Illuminate\Database\Seeder;

class AgencyTypesTableSeeder extends Seeder
{
    private $types = [
        ['id' => 1, 'name' => 'Pemerintah Provinsi'],
        ['id' => 2, 'name' => 'Sekolah'],
        ['id' => 3, 'name' => 'Pemerintah Kabupaten/Kota'],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->types as $type) {
            App\AgencyType::create($type);
        }
    }
}