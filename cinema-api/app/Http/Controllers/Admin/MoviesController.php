<?php

namespace App\Http\Controllers\Admin;

use App\Models\Movie;
use App\Models\Screen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MovieResource;
use App\Http\Resources\ScreenResource;
use App\Http\Resources\ScreeningResource;

class MoviesController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'is_admin']);
    }

    /**
     * get all users
     */
    public function index(Request $request)
    {
        $per_page = $request->per_page ? $request->per_page : 10;
        return MovieResource::collection(Movie::orderBy('id', 'desc')->paginate($per_page));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:2|max:100',
            'length' => 'required|string|min:5|max:5',
            'genre' => 'required|string|min:2|max:100',
            'image' => 'required|base64image',
        ]);

        $movie = Movie::create($request->only(['name', 'length', 'genre']));
        $movie->addMediaFromBase64($request->image)
            ->toMediaCollection('poster');
        return response()->json(['message' => 'Added Successfully!']);
    }

    public function screening(Request $request, Movie $movie)
    {
        $per_page = $request->per_page ? $request->per_page : 10;
        return ScreeningResource::collection($movie->screening()->orderBy('id', 'desc')->paginate($per_page));
    }

    public function show(Movie $movie)
    {
        return new MovieResource($movie);
    }

    public function screeningStore(Request $request, Movie $movie)
    {
        $request->validate([
            'screen_id' => 'required|exists:screens,id',
            'from' => 'required',
            'to' => 'required:after:from',
        ]);

        $movie->screening()->create($request->all());
        return response()->json(['message' => 'Added Successfully!']);
    }

    public function screens()
    {
        return ScreenResource::collection(Screen::all());
    }
}
