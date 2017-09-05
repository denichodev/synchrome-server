<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Workshift;

class WorkshiftController extends Controller
{
    public function index()
    {
        $workshifts = Workshift::get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $workshifts
            ]);
    }
}
