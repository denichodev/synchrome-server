<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScanLog extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'date',
        'employee_id',
        'workshift_in',
        'workshift_out',
        'checkin_at',
        'checkout_at',
        'absence_type_id',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function absenceType()
    {
        return $this->belongsTo(AbsenceType::class);
    }
}
