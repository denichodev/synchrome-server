<?php
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

if (App::environment('local')) {
    $config = [
        'middleware' => ['api']
    ];
} else {
    $config = [
        'middleware' => ['api', 'jwt_auth']
    ];
}

Route::group($config, function () {
    Route::get('check-user', 'Auth\AuthController@checkUser')->name('api.check_user');

    Route::get('calendar', 'Api\CalendarController@index')->name('api.calendars.index');
    Route::post('calendar', 'Api\CalendarController@store')->name('api.calendars.store');
    Route::get('calendar/{id}', 'Api\CalendarController@get')->name('api.calendars.get');
    Route::patch('calendar/{id}', 'Api\CalendarController@update')->name('api.calendars.update');
    Route::delete('calendar/{id}', 'Api\CalendarController@destroy')->name('api.calendars.destroy');
    Route::get('calendar/event/category', 'Api\CalendarController@eventCategories')->name('api.calendars.events.categories.index');

    Route::get('agency', 'Api\AgencyController@index')->name('api.agencies.index');
    Route::get('agency/{id}/echelons', 'Api\AgencyController@echelons')->name('api.agencies.echelons');

    Route::get('employee', 'Api\EmployeeController@index')->name('api.employees.index');
    Route::post('employee', 'Api\EmployeeController@store')->name('api.employees.store');
    Route::get('employee/workshifts', 'Api\EmployeeController@workshifts')->name('api.employees.workshifts');
    Route::get('employee/ranks', 'Api\RankController@index')->name('api.ranks.index');
    Route::get('employee/{id}', 'Api\EmployeeController@get')->name('api.employees.get');
    Route::patch('employee/{id}', 'Api\EmployeeController@update')->name('api.employees.update');
    Route::delete('employee/{id}', 'Api\EmployeeController@destroy')->name('api.employees.destroy');

    Route::get('cluster', 'Api\ClusterController@index')->name('api.clusters.index');
    Route::post('cluster', 'Api\ClusterController@store')->name('api.clusters.store');
    Route::get('cluster/{id}', 'Api\ClusterController@get')->name('api.clusters.get');
    Route::patch('cluster/{id}', 'Api\ClusterController@update')->name('api.clusters.update');
    Route::delete('cluster/{id}', 'Api\ClusterController@destroy')->name('api.clusters.destroy');
    Route::get('cluster/{id}/keys', 'Api\ClusterController@keys')->name('api.clusters.keys');
    Route::post('cluster/{id}/keys', 'Api\ClusterController@generateKey')->name('api.clusters.generate_key');
    Route::post('cluster/keys/{key_id}/disable', 'Api\ClusterController@disablekey')->name('api.clusters.disable_key');

    Route::get('religion', 'Api\ReligionController@index')->name('api.religions.index');

    Route::group(['middleware' => 'jwt_admin'], function () {
        Route::get('user/roles', 'Api\UserController@roles')->name('api.users.roles');
        Route::get('user', 'Api\UserController@index')->name('api.users.index');
        Route::post('user', 'Api\UserController@store')->name('api.users.store');
        Route::get('user/{id}', 'Api\UserController@get')->name('api.users.get');
        Route::patch('user/{id}', 'Api\UserController@update')->name('api.users.update');
        Route::delete('user/{id}', 'Api\UserController@destroy')->name('api.users.destroy');
    });
});
