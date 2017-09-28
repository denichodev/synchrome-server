<?php

use Illuminate\Database\Seeder;
use App\EventCategory;

class EventCategoriesTableSeeder extends Seeder
{
    private $categories = [
        [
            'id' => 2,
            'name' => 'Holiday',
            'color' => '#e74c3c'
        ],
        [
            'id' => 3,
            'name' => 'Special Workday',
            'color' => '#9b59b6'
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->categories as $category) {
            EventCategory::create($category);
        }
    }
}
