<?php

use Illuminate\Database\Seeder;

class CalendarsTableSeeder extends Seeder
{
    private $calendars = [
        [
            'name' => 'Kalender Pemprov',
            'start' => '2017-01-01',
            'end' => '2017-12-31',
            'status' => 'published',
            'events' => [
                [
                    'title' => 'Tahun Baru 2017',
                    'start' => '2017-01-01',
                    'is_weekday' => true,
                    'num_of_day' => 1,
                    'event_category_id' => 2
                ],
                [
                    'title' => 'H+1 Tahun Baru 2017',
                    'start' => '2017-01-02',
                    'is_weekday' => true,
                    'num_of_day' => 1,
                    'event_category_id' => 2
                ]
            ]
        ],
        [
            'name' => 'Kalender Pemprov',
            'start' => '2018-01-01',
            'end' => '2018-12-31',
            'status' => 'published',
            'events' => [
                [
                    'title' => 'Tahun Baru 2018',
                    'start' => '2018-01-01',
                    'is_weekday' => true,
                    'num_of_day' => 1,
                    'event_category_id' => 2
                ],
                [
                    'title' => 'H+1 Tahun Baru 2018',
                    'start' => '2018-01-02',
                    'is_weekday' => true,
                    'num_of_day' => 1,
                    'event_category_id' => 2
                ]
            ]
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->calendars as $data) {
            $calendar = App\Calendar::create([
                'name' => $data['name'],
                'start' => $data['start'],
                'end' => $data['end'],
                'status' => $data['status']
            ]);

            $event_source = [];

            foreach ($data['events'] as $event) {
                array_push($event_source, new App\Event($event));
            }

            $calendar->events()->saveMany($event_source);
        }
    }
}
