<?php

use App\Models\Movie;
use League\Csv\Reader;
use League\Csv\Statement;
use Illuminate\Database\Seeder;

class MoviesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $csv = Reader::createFromPath(__DIR__ . '/data/MovieGenre.csv', 'r');
        $csv->setHeaderOffset(0); //set the CSV header offset

        //get 25 records starting from the 11th row
        $stmt = (new Statement())
            ->offset(0);

        $records = $stmt->process($csv);
        $faker = Faker\Factory::create();
        $i = 0;
        foreach ($records as $record) {
            $movie = Movie::create([
                'name' => $record['Title'],
                'genre' => $record['Genre'],
                'length' => $faker->time('H:i'),
            ]);

            try {
                $movie->addMediaFromUrl($record['Poster'])
                    ->toMediaCollection('poster');
                $i++;
            } catch (Exception $e) {
                $movie->delete();
            }
            if ($i > 100) {
                break;
            }
        }
    }
}
