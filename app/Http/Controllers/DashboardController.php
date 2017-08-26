<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $jwt = JWTAuth::fromUser(Auth::user());

        return view('dashboard', compact('jwt'));
    }
}
