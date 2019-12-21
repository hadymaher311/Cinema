<?php

use App\User;
use App\Models\Screen;
use App\Models\Screening;
use App\Models\Reservation;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 10)->create();
        $this->call(MoviesSeeder::class);
        factory(Screen::class, 10)->create();
        $this->call(SeatsSeeder::class);
        factory(Screening::class, 100)->create();
        factory(Reservation::class, 100)->create();
    }
}
