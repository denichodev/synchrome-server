<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Agency;

class AgencyController extends Controller
{
    public function echelons(Request $request, $id)
    {
        $agency = Agency::find($id);

        if (is_null($agency)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['agency_not_found']
                ], 404);
        }

        return response()
            ->json([
                'result' => 'success',
                'data' => $agency->echelons()->orderBy('id', 'ASC')->get(['id', 'name'])
            ]);
    }
}
