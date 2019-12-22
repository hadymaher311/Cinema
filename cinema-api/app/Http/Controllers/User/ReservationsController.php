<?php

namespace App\Http\Controllers\User;

use App\Models\Seat;
use App\Models\Screening;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ScreeningResource;
use App\Http\Resources\ReservationResource;

class ReservationsController extends Controller
{

    public function __construct() {
        $this->middleware(['auth:api', 'is_user']);
    }

    public function index(Screening $screening)
    {
        return new ScreeningResource($screening->load(['reservations', 'movie', 'screen.seats']));
    }

    public function store(Request $request, Seat $seat, Screening $screening)
    {
        $reservation = Reservation::where([
            'screening_id'=> $screening->id,
            'seat_id'=> $seat->id,
        ])->first();
        if ($reservation) {
            return response()->json(['errors' => ['result' => 'This seat is not available']]);
        }
        $reservation = Reservation::create([
            'user_id' => auth()->id(),
            'screening_id'=> $screening->id,
            'seat_id'=> $seat->id,
        ]);
        return new ReservationResource($reservation);
    }
}
