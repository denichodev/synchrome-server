<?php

use Illuminate\Http\Request;
use App\Key;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['api', 'jwt_auth'], 'prefix' => 'int'], function () {
    Route::post('calendar', 'Api\CalendarController@store')->name('api.int.calendars.store');
    Route::get('calendar/{id}', 'Api\CalendarController@get')->name('api.int.calendars.get');
    Route::patch('calendar/{id}', 'Api\CalendarController@update')->name('api.int.calendars.update');
    Route::get('calendar/event/category', 'Api\EventCategoryController@index')->name('api.int.calendars.events.categories.index');
});
