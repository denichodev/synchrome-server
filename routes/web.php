<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'Auth\AuthController@login')->name('auth.login');
Route::post('/', 'Auth\AuthController@doLogin')->name('auth.do_login');
Route::post('/auth/logout', 'Auth\AuthController@doLogout')->name('auth.do_logout');

Route::group(['prefix' => 'dashboard', 'middleware' => 'auth'], function () {
    Route::get('/', 'DashboardController@dashboard')->name('dashboard');

    Route::group(['prefix' => 'calendars'], function () {
        Route::get('/', 'CalendarController@index')->name('calendars.index');
        Route::get('add-new', 'CalendarController@create')->name('calendars.create');
        Route::get('{id}', 'CalendarController@edit')->name('calendars.edit');
        Route::delete('{id}', 'CalendarController@destroy')->name('calendars.destroy');
    });
});