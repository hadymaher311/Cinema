<?php

namespace App\Http\Resources;

use App\Http\Resources\SeatResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreenResource extends JsonResource
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
            'cols' => $this->cols,
            'rows' => $this->rows,
            'seats' => SeatResource::collection($this->whenLoaded('seats')),
            'created_at' => $this->created_at,
            'upadted_at' => $this->upadted_at,
        ];
    }
}
