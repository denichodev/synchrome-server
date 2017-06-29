<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Calendar;
use App\Event;
use JWTAuth;
use Validator;
use DB;

class CalendarController extends Controller
{
    public function index()
    {
        $calendars = Calendar::all();

        return view('calendars.index', compact('calendars'));
    }

    public function create()
    {
        $user = Auth::user();

        try {
            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            abort(500);
        }

        return view('calendars.create', compact('token'));
    }

    {
        try {
        } catch (\Exception $e) {

        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $calendar = Calendar::find($id);

            if (is_null($calendar)) {
                abort(404);
            }

            $calendar->delete();
            DB::commit();

            return redirect()
                ->route('calendars.index');
        } catch (\Exception $e) {
            DB::rollback();

            abort(500);
        }
    }
}
