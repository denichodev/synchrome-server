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

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'events' => 'required|array',
            'events.*.title' => 'required',
            'events.*.start' => 'required|date',
            'status' => 'required|in:draft,published'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'error' => ['bad_request']
                ], 400);
        }

        try {
            $userData = $request->all();
            DB::beginTransaction();
            $calendar = Calendar::create([
                'name' => $userData['name'],
                'start_date' => date('Y-01-01'),
                'end_date' => date('Y-12-31'),
                'status' => $userData['status']
            ]);
            $events = [];

            foreach ($userData['events'] as $event) {
                $numOfDay = date('N', strtotime($event['start']));

                array_push($events, new Event([
                    'title' => $event['title'],
                    'start_date' => $event['start'],
                    'end_date' => ! empty($event['end']) ? $event['end'] : null,
                    'isWeekday' => empty($event['end']) && ($numOfDay == 6 || $numOfDay == 7) ? true : false,
                    'numOfDay' => $numOfDay
                ]));
            }

            $calendar->events()->saveMany($events);
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => $calendar
                ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()
                ->json([
                    'error' => [$e->getMessage()]
                ]);
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
