<?php

use App\Models\Seat;
use App\Models\Screen;
use Illuminate\Database\Seeder;

class SeatsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $screens = Screen::all();

        foreach ($screens as $screen) {
            $seatsNum = $screen->cols * $screen->rows;
            for ($i=0; $i < $seatsNum; $i++) { 
                Seat::create([
                    'screen_id' => $screen->id
                ]);
            }
        }
    }
}
