<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Models\Seat;
use App\Models\Screening;
use App\Models\Reservation;
use Faker\Generator as Faker;

$factory->define(Reservation::class, function (Faker $faker) {
    $screening = Screening::all()->random();
    return [
        'user_id' => function() {
            return User::all()->random();
        },
        'screening_id' => $screening,
        'seat_id' => function() use ($screening) {
            return $screening->screen->seats->random();
        },
    ];
});
