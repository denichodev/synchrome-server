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
    public function index(Request $request)
    {
        $user_data = $request->all();
        $employees = Employee::with([
            'echelon' => function ($query) {
                $query->select(['id', 'name', 'agency_id']);
            }, 
            'echelon.agency' => function ($query) {
                $query->select(['id', 'name']);
            }
        ]);

        if (! empty($request->get('agency_id'))) {
            $employees = $employees->where('agency_id', $user_data['agency_id']);
        }

        return response()
            ->json([
                'result' => 'success',
                'data' => $employees->get(['id', 'name', 'echelon_id'])
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
            'name' => 'required',
            'allowance_id' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ], 422);
        }

        $user_data = $request->all();
        $now = Carbon::now();

        try {
            DB::beginTransaction();
            $employee = Employee::create($request->all());
            DB::commit();

            $employee = Employee::with([
                'echelon' => function ($query) {
                    $query->select(['id', 'name', 'agency_id']);
                }, 
                'echelon.agency' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'workshift' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'religion' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'templates'
            ])->find($employee->id);

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
            'workshift' => function ($query) {
                $query->select(['id', 'name']);
            },
            'religion' => function ($query) {
                $query->select(['id', 'name']);
            },
            'allowance' => function ($query) {
                $query->select(['id', 'name']);
            },
            'calendar' => function ($query) {
                $query->select(['id', 'name']);
            },
            'templates',
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
            'name' => 'required',
            'allowance_id' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ], 422);
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
            DB::commit();

            $employee = Employee::with([
                'echelon' => function ($query) {
                    $query->select(['id', 'name', 'agency_id']);
                }, 
                'echelon.agency' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'workshift' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'religion' => function ($query) {
                    $query->select(['id', 'name']);
                },
                'templates'
            ])->find($employee->id);

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
