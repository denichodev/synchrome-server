<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Allowance;
use Validator;
use DB;

class AllowanceController extends Controller
{
    public function index()
    {
        $allowances = Allowance::get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $allowances
            ]);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'id' => 'required|unique:allowances,id',
            'name' => 'required',
            'tpp' => 'required',
            'meal' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ], 422);
        }

        try {
            DB::beginTransaction();
            $allowance = Allowance::create($request->all());
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => $allowance
                ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ], 500);
        }
    }

    public function get($id)
    {
        $allowance = Allowance::find($id);

        if (is_null($allowance)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['allowance_not_found']
                ], 404);
        }

        return response()
            ->json([
                'result' => 'success',
                'data' => $allowance
            ]);
    }

    public function update(Request $request, $id)
    {
        $allowance = Allowance::find($id);
        
        if (is_null($allowance)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['allowance_not_found']
                ], 404);
        }

        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'tpp' => 'required',
            'meal' => 'required'
        ]);
        $user_data = $request->except('id');

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ], 422);
        }

        try {
            DB::beginTransaction();
            $allowance->update($user_data);
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => Allowance::find($allowance->id)
                ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ], 500);
        }
    }

    public function destroy($id)
    {
        $allowance = Allowance::find($id);
        
        if (is_null($allowance)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['allowance_not_found']
                ], 404);
        }

        try {
            DB::beginTransaction();
            $allowance->delete();
            DB::commit();

            return response()
                ->json(['result' => 'success']);
        } catch (\Exception $e) {
            DB::rollback();

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ], 500);
        }
    }
}
