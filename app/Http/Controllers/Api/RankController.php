<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Rank;

class RankController extends Controller
{
    public function index()
    {
        $ranks = Rank::orderBy('id', 'ASC')->get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $ranks
            ]);
    }
}
