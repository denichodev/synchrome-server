<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Calendar;
use App\Event;
use JWTAuth;
use Validator;
use DB;

class CalendarController extends Controller
{
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
                    'start' => $event['start'],
                    'end' => ! empty($event['end']) ? $event['end'] : null,
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

    public function get($id)
    {
        if (empty($id)) {
            return response()
                ->json([
                    'error' => ['Calendar ID required']
                ], 400);
        }

        $calendar = Calendar::find($id);

        if (is_null($calendar)) {
            return response()
                ->json([
                    'error' => ['Calendar with ID ' . $id. ' not found']
                ], 404);
        }

        $events = $calendar->events->map(function ($item, $key) {
            $item->originalId = $item->id;
            $item->isEdited = false;

            return collect($item)->only(['originalId', 'isEdited', 'title', 'start', 'end']);
        });
        $data = [
            'id' => $calendar->id,
            'name' => $calendar->name,
            'status' => $calendar->status,
            'events' => $events
        ];

        return response()
            ->json([
                'result' => 'success',
                'data' => $data
            ]);
    }
}
