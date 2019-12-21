<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
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
            'name' => $this->name,
            'length' => $this->length,
            'genre' => $this->genre,
            'image' => ($this->image) ? [
                'image_url' => env('APP_URL') . $this->image->getUrl(),
                'card_url' => env('APP_URL') . $this->image->getUrl('card'),
                'thumb_url' => env('APP_URL') . $this->image->getUrl('thumb'),
            ] : null,
            'screening' => ScreeningResource::collection($this->whenLoaded('screening')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
