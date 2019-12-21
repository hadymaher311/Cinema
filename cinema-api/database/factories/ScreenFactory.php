<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Screen;
use Faker\Generator as Faker;

$factory->define(Screen::class, function (Faker $faker) {
    return [
        'rows' => $faker->numberBetween(10,12),
        'cols' => $faker->numberBetween(10,12),
    ];
});
