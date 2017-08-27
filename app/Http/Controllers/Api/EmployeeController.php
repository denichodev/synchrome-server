<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Employee;
use Validator;
use DB;

class EmployeeController extends Controller
{
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'echelon_id' => 'required',
            'id' => 'required|unique:employees,id',
            'name' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ]);
        }

        try {
            DB::beginTransaction();
            $employee = Employee::create($request->all());
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => $employee
                ]);
        } catch (\Exception $e) {
            DB::rollback();

            if (\App::environment('local')) {
                throw $e;
            }

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ]);
        }

    }
}
