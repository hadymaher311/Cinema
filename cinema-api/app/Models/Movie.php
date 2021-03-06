<?php

namespace App\Models;

use App\Models\Screening;
use Spatie\MediaLibrary\Models\Media;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Movie extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = [
        'name', 'genre', 'length' 
    ];

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('card')
              ->width(368)
              ->height(232);
        $this->addMediaConversion('thumb')
              ->width(100)
              ->height(100);
    }

    /**
     * The function to return Image url.
     *
     */
    public function getImageAttribute()
    {
        return $this->getMedia('poster')->last();
    }

    public function screening()
    {
        return $this->hasMany(Screening::class);
    }
}
