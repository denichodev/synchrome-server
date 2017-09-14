<?php

use Illuminate\Database\Seeder;
use App\Workshift;
use App\Shift;

class WorkshiftsTableSeeder extends Seeder
{
    protected $workshifts = [
        [
            'id' => 1,
            'name' => 'Guru Sekolah',
            'details' => [
                [
                    'day' => 'Mon',
                    'in' => '07:00',
                    'out' => '14:00'
                ],
                [
                    'day' => 'Tue',
                    'in' => '07:00',
                    'out' => '14:00'
                ],
                [
                    'day' => 'Wed',
                    'in' => '07:00',
                    'out' => '14:00'
                ],
                [
                    'day' => 'Thu',
                    'in' => '07:00',
                    'out' => '14:00'
                ],
                [
                    'day' => 'Fri',
                    'in' => '07:00',
                    'out' => '14:00'
                ],
                [
                    'day' => 'Sat',
                    'in' => '07:00',
                    'out' => '14:00'
                ],
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
        foreach ($this->workshifts as $data) {
            $workshift = Workshift::create([
                'id' => $data['id'],
                'name' => $data['name']
            ]);
            $details = [];

            foreach ($data['details'] as $detail) {
                array_push($details, new Shift($detail));
            }

            $workshift->details()->saveMany($details);
        }
    }
}
