<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Calendar;

class CalendarController extends Controller
{
    public function index()
    {
        $calendars = Calendar::with(['events'])
            ->orderBy('name', 'ASC')
            ->get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $calendars
            ]);
    }
}
