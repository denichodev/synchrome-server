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
        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(EventCategoriesTableSeeder::class);
        $this->call(AgencyTypesTableSeeder::class);
        $this->call(AgenciesTableSeeder::class);
        $this->call(EchelonsTableSeeder::class);
        $this->call(WorkshiftsTableSeeder::class);
        $this->call(AbsenceTypesTableSeeder::class);
        $this->call(ReligionsTableSeeder::class);
        $this->call(RanksTableSeeder::class);
        $this->call(AllowancesTableSeeder::class);
    }
}
