<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScanLog extends Model
{
    use SoftDeletes;

    protected $casts = [
        'status' => 'boolean'
    ];

    protected $fillable = [
        'date',
        'employee_id',
        'workshift_in',
        'workshift_out',
        'checkin',
        'checkout',
        'absence_type_id',
        'status',
        'work_duration',
        'off_duration',
        'workshift_work_duration'
    ];

    protected $hidden = [
        'employee_id',
        'absence_type_id',
        'deleted_at'
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function absenceType()
    {
        return $this->belongsTo(AbsenceType::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
