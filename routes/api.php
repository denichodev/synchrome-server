<?php

use Illuminate\Http\Request;

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
    Route::post('calendar', 'Api\CalendarController@store')->name('api.calendars.store');
    Route::get('calendar/{id}', 'Api\CalendarController@get')->name('api.calendars.get');
    Route::patch('calendar/{id}', 'Api\CalendarController@update')->name('api.calendars.update');
});
