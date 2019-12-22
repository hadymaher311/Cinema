<?php

namespace App\Http\Controllers\Admin;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class UsersController extends Controller
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
        return UserResource::collection(User::orderBy('id', 'desc')->paginate($per_page));
    }

    public function toggle_admin(Request $request, User $user)
    {
        $user->is_admin = !$user->is_admin;
        $user->save();
        return response()->json(['message' => 'Updated successfully!!']);
    }
}
