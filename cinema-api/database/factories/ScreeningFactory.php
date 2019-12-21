<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Carbon\Carbon;
use App\Models\Movie;
use App\Models\Screen;
use App\Models\Screening;
use Faker\Generator as Faker;

$factory->define(Screening::class, function (Faker $faker) {
    $from = $faker->dateTimeBetween('now', Carbon::now()->addMonths($faker->numberBetween(1, 10)));
    return [
        'from' => $from,
        'to' => Carbon::parse($from)->addHours(2),
        'movie_id' => function() {
            return Movie::all()->random();
        },
        'screen_id' => function() {
            return Screen::all()->random();
        }
    ];
});
