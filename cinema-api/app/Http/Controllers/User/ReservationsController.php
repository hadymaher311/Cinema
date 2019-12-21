<?php

namespace App\Http\Controllers\User;

use App\Models\Screening;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ScreeningResource;

class ReservationsController extends Controller
{
    public function index(Screening $screening)
    {
        return new ScreeningResource($screening->load(['reservations', 'movie', 'screen']));
    }
}
