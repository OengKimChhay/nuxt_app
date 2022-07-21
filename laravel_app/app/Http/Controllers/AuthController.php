<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // this constructor is represent as middleware so all function in this controller must me authenticated first
    // public function __construct()
    // {
    //     $this->middleware('jwt.verify', ['except' => ['login']]);
    // }

    public function register(Request $request)
    {

        $data = $request->all();
        $validator = Validator::make($data, [
            'name'      => 'required|string',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        //Request is valid, create new user
        $user = User::create([
        	'name' => $request->name,
        	'email' => $request->email,
        	'password' => bcrypt($request->password)
        ]);

        //User created, return success response
        return response()->json([
            'success'   => true,
            'status'    => Response::HTTP_OK,
            'message'   => 'User created successfully',
            'data'      => $user
        ], Response::HTTP_OK);
    }

}
