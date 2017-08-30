<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Role;
use Validator;
use DB;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $users
            ]);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'password_conf' => 'required|same:password',
            'role_id' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ], 400);
        }

        try {
            $user_data = $request->except('password_conf');
            $user_data['password'] = bcrypt($user_data['password']);

            DB::beginTransaction();
            $user = User::create($user_data);
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => User::with('role')->find($user->id)
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
                ], 500);
        }
    }

    public function get($id)
    {
        $user = User::with('role')->find($id);
        
        if (is_null($user)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['user_not_found']
                ], 404);
        }

        return response()
            ->json([
                'result' => 'success',
                'data' => $user
            ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::with('role')->find($id);
        
        if (is_null($user)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['user_not_found']
                ], 404);
        }

        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes',
            'password_conf' => 'required_with:password|same:password',
            'role_id' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation->errors()
                ], 400);
        }

        try {
            $user_data = $request->except('password_conf');

            if (! empty($user_data['password'])) {
                $user_data['password'] = bcrypt($user_data['password']);
            }

            DB::beginTransaction();
            $user->update($user_data);
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => User::with('role')->find($user->id)
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
                ], 500);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['user_not_found']
                ], 404);
        }

        try {
            DB::beginTransaction();
            $user->delete();
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

    public function roles()
    {
        $roles = Role::get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $roles
            ]);
    }
}
