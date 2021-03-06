<?php

namespace App\Http\Controllers\User;

use App\Models\Movie;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MovieResource;

class MoviesController extends Controller
{
    public function __construct() {
        $this->middleware(['auth:api', 'is_user']);
    }
    
    /**
     * get all movies
     */
    public function index(Request $request)
    {
        $per_page = $request->per_page ? $request->per_page : 20;
        return MovieResource::collection(Movie::paginate($per_page));
    }

    public function show(Movie $movie)
    {
        return new MovieResource($movie->load('screening'));
    }
}
