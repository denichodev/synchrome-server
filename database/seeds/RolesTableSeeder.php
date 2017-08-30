<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesTableSeeder extends Seeder
{
    private $roles = [
        [
            'id' => 1,
            'name' => 'Administrator'
        ],
        [
            'id' => 2,
            'name' => 'Operator'
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->roles as $role) {
            Role::create($role);
        }
    }
}
