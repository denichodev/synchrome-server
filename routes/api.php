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

Route::group(['middleware' => ['api']], function () {
    Route::get('calendar', 'Api\CalendarController@index')->name('api.calendars.index');
    Route::post('calendar', 'Api\CalendarController@store')->name('api.calendars.store');
    Route::get('calendar/{id}', 'Api\CalendarController@get')->name('api.calendars.get');
    Route::patch('calendar/{id}', 'Api\CalendarController@update')->name('api.calendars.update');
    Route::delete('calendar/{id}', 'Api\CalendarController@destroy')->name('api.calendars.destroy');
    Route::get('calendar/event/category', 'Api\CalendarController@eventCategories')->name('api.calendars.events.categories.index');

    Route::get('agency', 'Api\AgencyController@index')->name('api.agencies.index');
    Route::get('agency/{id}/echelons', 'Api\AgencyController@echelons')->name('api.agencies.echelons');
    Route::post('employee', 'Api\EmployeeController@store')->name('api.employees.store');
});
