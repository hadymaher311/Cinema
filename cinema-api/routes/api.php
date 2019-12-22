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

Route::group([

    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'User\AuthController@login');
    Route::post('register', 'User\AuthController@register');
    Route::post('logout', 'User\AuthController@logout');
    Route::post('me', 'User\AuthController@me');
});

Route::group([

    'prefix' => 'user'

], function ($router) {
    Route::get('movies', 'User\MoviesController@index');
    Route::get('movies/{movie}', 'User\MoviesController@show');
    Route::get('movies/{screening}/reservations', 'User\ReservationsController@index');
    Route::post('movies/{seat}/reservations/{screening}/store', 'User\ReservationsController@store');
});

Route::group([
    'prefix' => 'admin'
], function ($router) {
    Route::get('users', 'Admin\UsersController@index');
    Route::post('users/toggle_admin/{user}', 'Admin\UsersController@toggle_admin');
});

Route::get('/welcome/movies', 'WelcomeController@index');
