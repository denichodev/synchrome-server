<?php

namespace App\Http\Controllers\Api\Internal;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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

    public function update(Request $request, $id)
    {
        if (empty($id)) {
            return response()
                ->json([
                    'error' => ['Calendar ID required']
                ], 400);
        }

        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'updatedEvents' => 'array',
            'updatedEvents.*.originalId' => 'required',
            'updatedEvents.*.title' => 'required',
            'updatedEvents.*.start' => 'required|date',
            'deletedEvents' => 'array',
            'deletedEvents.*.originalId' => 'required',
            'updatedEvents.*.start' => 'required|date',
            'newEvents' => 'array',
            'newEvents.*.title' => 'required',
            'newEvents.*.start' => 'required|date',
            'status' => 'required|in:draft,published'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'error' => $validation->errors()
                ], 400);
        }

        $calendar = Calendar::find($id);

        if (is_null($calendar)) {
            return response()
                ->json([
                    'error' => ['Calendar with ID ' . $id. ' not found']
                ], 404);
        }

        try {
            $userData = $request->all();
            DB::beginTransaction();
            $calendar->update([
                'name' => $userData['name'],
                'status' => $userData['status']
            ]);
            $this->batchUpdate(collect($userData['updatedEvents']));
            $this->batchDelete(collect($userData['deletedEvents']));
            $this->batchInsert($calendar, collect($userData['newEvents']));
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

    public function batchInsert($calendar, Collection $events)
    {
        $newEvents = [];

        $events->each(function ($newEvent) use (&$newEvents) {
            $numOfDay = date('N', strtotime($newEvent['start']));
            array_push($newEvents, new Event([
                'title' => $newEvent['title'],
                'start' => $newEvent['start'],
                'end' => ! empty($newEvent['end']) ? $newEvent['end'] : null,
                'isWeekday' => empty($newEvent['end']) && ($numOfDay == 6 || $numOfDay == 7) ? true : false,
                'numOfDay' => $numOfDay
            ]));
        });

        $calendar->events()->saveMany($newEvents);
    }

    public function batchUpdate(Collection $events)
    {
        $events->each(function ($updatedEvent) {
            $numOfDay = date('N', strtotime($updatedEvent['start']));
            $event = Event::find($updatedEvent['originalId']);

            $event->update([
                'title' => $updatedEvent['title'],
                'start' => $updatedEvent['start'],
                'end' => empty($updatedEvent['end']) || $updatedEvent['end'] == $updatedEvent['start'] ? null : $updatedEvent['end'],
                'isWeekday' => empty($updatedEvent['end']) && ($numOfDay == 6 || $numOfDay == 7) ? true : false,
                'numOfDay' => $numOfDay
            ]);
        });
    }

    public function batchDelete(Collection $events)
    {
        $deletedEventIds = $events->map(function ($event) {
            return $event['originalId'];
        });

        Event::whereIn('id', $deletedEventIds)->delete();
    }
}