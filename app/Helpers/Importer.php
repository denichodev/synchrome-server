<?php

namespace App\Helpers;

use DB;
use App\Employee;
use App\Template;

class Importer
{
    protected $table_name;

    protected $defaults = [
        'agency_id' => '1.1.01',
        'echelon_id' => '1.1.01',
        'workshift_id' => 1,
        'married' => 1,
        'religion_id' => 2,
        'address' => 'Test',
        'phone' => '082333444555',
        'allowance_id' => 'E4B3',
        'calendar_id' => 1,
        'rank_id' => '1A'
    ];

    protected $selected_columns = [
        'NIP',
        'NAMA'
    ];

    public function __construct($table)
    {
        $this->table_name = $table;
    }

    public function import()
    {
        $this->table()
            ->select($this->selected_columns)
            ->orderBy('NIP', 'ASC')
            ->chunk(200, function ($chunk) {
            try {
                DB::transaction(function () use ($chunk) {
                    foreach ($chunk as $data) {
                        $employee = Employee::find($data->NIP);

                        if (is_null($employee) && ! empty($data->NAMA)) {
                            $employee = Employee::create([
                                'id' => $data->NIP,
                                'name' => $data->NAMA,
                                'agency_id' => $this->defaults['agency_id'],
                                'echelon_id' => $this->defaults['echelon_id'],
                                'workshift_id' => $this->defaults['workshift_id'],
                                'married' => $this->defaults['married'],
                                'religion_id' => $this->defaults['religion_id'],
                                'address' => $this->defaults['address'],
                                'phone' => $this->defaults['phone'],
                                'allowance_id' => $this->defaults['allowance_id'],
                                'calendar_id' => $this->defaults['calendar_id'],
                                'gender' => ! empty($data->KDJENKEL) ? $this->gender($data->KDJENKEL) : 'm',
                                'rank_id' => $this->defaults['rank_id']
                            ]);
                            echo "Employee $employee->id created" . PHP_EOL;
                        }

                        if (! empty($data->NAMA)) {
                            $templates = DB::connection('source')->table('t_template')
                            ->where('pin', $data->NIP)
                            ->get()
                            ->map(function ($item) use ($employee) {
                                if (Template::where(['employee_id' => $employee->id, 'template' => $item->template])->count() === 0) {
                                    return new Template([
                                        'template' => $item->template,
                                        'index' => $item->finger_idx,
                                        'alg_ver' => $item->alg_ver
                                    ]);
                                }

                                return [];
                            })
                            ->reject(function ($item) {
                                return is_array($item);
                            });

                            if (count($templates) > 0) {
                                $employee->templates()->saveMany($templates);
                                echo "    " . count($templates) . " template(s) for employee $employee->id created" . PHP_EOL;
                            }
                        }
                    }
                });
            } catch (\Exception $e) {
                throw $e;
            }
        });
    }

    protected function gender($input)
    {
        return $input === 1 ? 'm' : 'f';
    }

    protected function table()
    {
        return DB::connection('source')->table($this->table_name);
    }
}