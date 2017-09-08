<?php

use Illuminate\Database\Seeder;
use App\AbsenceType;

class AbsenceTypesTableSeeder extends Seeder
{
    private $absence_types = [
        ['id' => 'A', 'name' => 'Alpha'],
        ['id' => 'S', 'name' => 'Sakit'],
        ['id' => 'TR', 'name' => 'Training/Diklat'],
        ['id' => 'D', 'name' => 'Tugas Kantor/Dinas/SPPD'],
        ['id' => 'I', 'name' => 'Izin'],
        ['id' => 'C', 'name' => 'Cuti'],
        ['id' => 'L', 'name' => 'Lain-lain'],
        ['id' => 'O', 'name' => 'Off/Hari Libur'],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->absence_types as $type) {
            AbsenceType::create($type);
        }
    }
}
