<?php

namespace App\Models;

use App\Models\Seat;
use Illuminate\Database\Eloquent\Model;

class Screen extends Model
{
    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
