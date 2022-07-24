<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ResponseController;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Exception;

class AuthController extends Controller
{
    // this constructor is represent as middleware so all function in this controller must me authenticated first
    // public function __construct()
    // {
    //     $this->middleware('jwt.verify', ['except' => ['login']]);
    // }

    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'name'      => 'required|string',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|string|min:6|max:50'
        ]);

        if ($validator->fails()) {
            $data = [
                'error' => $validator->messages()
            ];
            return ResponseController::client($data);
        }


        $user = User::create([
        	'name' => $request->name,
        	'email' => $request->email,
        	'password' => bcrypt($request->password)
        ]);

        $data = [
            'message' => 'User created successfully',
            'data' => $user,
        ];
        return ResponseController::success($data);
    }


    public function login(Request $request){

        $credentials = $request->only('email', 'password');
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);


        if ($validator->fails()) {
            $data = [
                'error' => $validator->messages()
            ];
            return ResponseController::client($data);
        }

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                $data = [
                    'message' => 'Invalid Email or Password',
                ];
                return ResponseController::unAuthorized($data);
            }else{
                $data = [
                    'message'   => 'Login Success.',
                    'token'     => $token,
                    'user'      => JWTAuth::user()
                ];
                return ResponseController::success($data);
            }
        } catch (JWTException $e) {

            $data = [
                'message' => 'Could not create token.',
            ];
            return ResponseController::serverError($data);
        }

    }


    public function logout(Request $request){

        try {

            Validator::make($request->all(),[
                'token' => 'required'
            ]);
            JWTAuth::invalidate($request->token);
            $data = [
                'message' => 'User logged out successfully'
            ];
            return ResponseController::success($data);

        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function getUser(Request $request){
        try {
            Validator::make($request->all(),[
                'token' => 'required'
            ]);
            $user = JWTAuth::authenticate($request->token);
            $data = [
                'message' => 'user logged in',
                'user'   => $user
            ];
            return ResponseController::success($data);
        } catch (Exception $e) {
            $data = [
                'message' => $e->getMessage(),
            ];
            return ResponseController::serverError($data);
        }
    }

    public function getAllUser(){
        try {
            $users = User::select('id', 'name', 'email', 'created_at')->get();
            $data = [
                'message' => 'All users',
                'users'   => $users
            ];
            return ResponseController::success($data);
        } catch (Exception $e) {
            $data = [
                'message' => $e->getMessage(),
            ];
            return ResponseController::serverError($data);
        }

    }

}
