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
    Route::post('calendar', 'Api\Internal\CalendarController@store')->name('api.int.calendars.store');
    Route::get('calendar/{id}', 'Api\Internal\CalendarController@get')->name('api.int.calendars.get');
    Route::patch('calendar/{id}', 'Api\Internal\CalendarController@update')->name('api.int.calendars.update');
});

Route::group(['middleware' => ['api', 'cluster']], function () {
    Route::get('/', function (Request $request) {
        $key = Key::findByKey($request->get('key'));

        return response()
            ->json([
                'result' => 'success',
                'data' => [
                    'api_version' => env('APP_VERSION'),
                    'user' => $key->cluster->name
                ]
            ]);
    });

    Route::get('calendar', 'Api\CalendarController@index')->name('api.calendars.index');

    Route::any('{catchall}', function() {
        return response()
            ->json([
                'result' => 'failed',
                'errors' => ['Route not found']
            ], 404);
    })->where('catchall', '(.*)');
});
