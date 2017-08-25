<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Employee;
use App\Agency;
use DB;
use JWTAuth;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with(['echelon'])->get();

        return view('employees.index', compact('employees'));
    }

    public function create()
    {
        $agencies = Agency::get(['id', 'name']);
        $jwt = JWTAuth::fromUser(Auth::user());

        return view('employees.create', compact('agencies', 'jwt'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'echelon_id' => 'required',
            'name' => 'required'
        ]);

        try {
            DB::beginTransaction();
            Employee::create($request->except('_token'));
            DB::commit();

            return redirect()
                ->route('employees.index');
        } catch (\Exception $e) {
            DB::rollback();

            if (\App::environment('local')) {
                throw $e;
            }

            abort(500);
        }
    }
}
