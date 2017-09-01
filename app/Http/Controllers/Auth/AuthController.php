<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\User;
use JWTAuth;

class AuthController extends Controller
{
    public function login()
    {
        return view('login');
    }

    public function doLogin(Request $request)
    {
        $userData = $request->except('_token');

        if (Auth::attempt($userData)) {
            return redirect()
                ->route('dashboard');
        }

        return redirect()
            ->back()
            ->withMsg('Wrong username/password combination');
    }

    public function doLogout()
    {
        Auth::logout();

        return redirect()
            ->route('auth.login');
    }

    public function checkUser(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $user->role = $user->role()->get();

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
}
