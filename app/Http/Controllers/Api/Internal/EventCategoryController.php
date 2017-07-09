<?php

namespace App\Http\Controllers\Api\Internal;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\EventCategory;

class EventCategoryController extends Controller
{
    public function index()
    {
        $categories = EventCategory::get();

        return response()
            ->json([
                'result' => 'success',
                'data' => $categories
            ]);
    }
}
