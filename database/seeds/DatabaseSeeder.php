<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(EventCategoriesTableSeeder::class);
        $this->call(AgencyTypesTableSeeder::class);
        $this->call(AgenciesTableSeeder::class);
        $this->call(EchelonsTableSeeder::class);
    }
}
