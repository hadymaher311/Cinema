<?php

namespace App\Http\Resources;

use App\Http\Resources\MovieResource;
use App\Http\Resources\ScreenResource;
use App\Http\Resources\ReservationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreeningResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'from' => $this->from,
            'to' => $this->to,
            'movie_id' => $this->movie_id,
            'screen_id' => $this->screen_id,
            'screen' => new ScreenResource($this->whenLoaded('screen')),
            'movie' => new MovieResource($this->whenLoaded('movie')),
            'reservations' => ReservationResource::collection($this->whenLoaded('reservations')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
