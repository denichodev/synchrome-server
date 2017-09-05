<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Employee;
use Validator;
use DB;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with([
            'echelon' => function ($query) {
                $query->select(['id', 'name', 'agency_id']);
            }, 
            
            'echelon.agency' => function ($query) {
                $query->select(['id', 'name']);
        }])
        ->get(['id', 'name', 'echelon_id']);

        return response()
            ->json([
                'result' => 'success',
                'data' => $employees
            ]);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'echelon_id' => 'required',
            'workshift_id' => 'required',
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

    public function get($id)
    {
        $employee = Employee::with([
            'echelon' => function ($query) {
                $query->select(['id', 'name', 'agency_id']);
            }, 
            'echelon.agency' => function ($query) {
                $query->select(['id', 'name']);
            }
        ])->find($id);

        if (is_null($employee)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['employee_not_found']
                ], 404);
        }

        return response()
            ->json([
                'result' => 'success',
                'data' => $employee
            ]);
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (is_null($employee)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['employee_not_found']
                ], 404);
        }

        try {
            DB::beginTransaction();
            $employee->delete();
            DB::commit();

            return response()
                ->json([
                    'result' => 'success'
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
