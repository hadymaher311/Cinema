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
});

Route::get('/welcome/movies', 'WelcomeController@index');
