<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email' => 'dencho.12@gmail.com',
            'name' => 'Deni Cho',
            'password' => bcrypt('dlfjs')
        ]);
    }
}
