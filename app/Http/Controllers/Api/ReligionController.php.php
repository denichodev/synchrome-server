<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Religion;

class ReligionController extends Controller
{
    public function index()
    {
        $religions = Religion::get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $religions
            ]);
    }
}
