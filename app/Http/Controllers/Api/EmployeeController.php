<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Employee;
use App\Workshift;
use App\Rank;
use Carbon\Carbon;
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
            }
        ])
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
            'religion_id' => 'required',
            'married' => 'required|boolean',
            'gender' => 'required',
            'address' => 'required',
            'phone' => 'required|max:12',
            'rank_id' => 'sometimes',
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

        $user_data = $request->all();

        try {
            DB::beginTransaction();
            $employee = Employee::create($request->all());
            $employee->rankHistory()->attach($user_data['rank_id']);
            DB::commit();

            $employee = Employee::with([
                'echelon' => function ($query) {
                    $query->select(['id', 'name', 'agency_id']);
                }, 
                'echelon.agency' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'workshift',
                'templates',
                'religion'
            ])->find($employee->id);
            $employee->rank = $employee->currentRank();

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
            },
            'workshift',
            'templates',
            'religion'
        ])->find($id);

        if (is_null($employee)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['employee_not_found']
                ], 404);
        }

        $employee->rank = $employee->currentRank();

        return response()
            ->json([
                'result' => 'success',
                'data' => $employee
            ]);
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'echelon_id' => 'required',
            'workshift_id' => 'required',
            'religion_id' => 'required',
            'married' => 'required|boolean',
            'gender' => 'required',
            'address' => 'required',
            'phone' => 'required|max:12',
            'rank_id' => 'sometimes',
            'name' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ]);
        }

        $employee = Employee::find($id);
        $user_data = $request->except('id');

        if (is_null($employee)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['employee_not_found']
                ], 404);
        }

        try {
            DB::beginTransaction();
            $employee->update($user_data);

            if ($employee->rankHistory()->orderBy('created_at', 'DESC')->first()->id !== $user_data['rank_id']) {
                $now = Carbon::now();

                $employee->rankHistory()->attach($user_data['rank_id'], ['created_at' => $now, 'updated_at' => $now]);
            }

            DB::commit();

            $employee = Employee::with([
                'echelon' => function ($query) {
                    $query->select(['id', 'name', 'agency_id']);
                }, 
                'echelon.agency' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'workshift',
                'templates',
                'religion'
            ])->find($employee->id);
            $employee->rank = $employee->currentRank();

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
            $employee->rankHistory()->detach();
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

    public function workshifts()
    {
        $workshifts = Workshift::get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $workshifts
            ]);
    }

    public function ranks()
    {
        $ranks = Rank::orderBy('id', 'ASC')->get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $ranks
            ]);
    }
}
