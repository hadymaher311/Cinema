<?php

namespace App\Models;

use App\Models\Movie;
use App\Models\Screen;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Model;

class Screening extends Model
{

    protected $fillable = [
        'from', 'to', 'screen_id'
    ];

    public function screen()
    {
        return $this->belongsTo(Screen::class);
    }

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
