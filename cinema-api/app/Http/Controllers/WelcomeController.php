<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use App\Http\Resources\MovieResource;

class WelcomeController extends Controller
{
    /**
     * get last 12 movies
     */
    public function index()
    {
        return MovieResource::collection(Movie::orderBy('id', 'desc')->limit(12)->get());
    }
}
