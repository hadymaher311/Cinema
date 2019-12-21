<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Models\Seat;
use App\Models\Screening;
use App\Models\Reservation;
use Faker\Generator as Faker;

$factory->define(Reservation::class, function (Faker $faker) {
    return [
        'user_id' => function() {
            return User::all()->random();
        },
        'screening_id' => function() {
            return Screening::all()->random();
        },
        'seat_id' => function() {
            return Seat::all()->random();
        },
    ];
});
