<?php

use Illuminate\Database\Seeder;
use App\Workshift;

class WorkshiftsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Workshift::create([
            'name' => 'Normal Workday',
            'in' => '08:00:00',
            'out' => '17:00:00'
        ]);
    }
}
