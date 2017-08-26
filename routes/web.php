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

Route::get('panel', 'PanelController@dashboard')->name('dashboard');