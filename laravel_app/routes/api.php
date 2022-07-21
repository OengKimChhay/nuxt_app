<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return 'hello';
// });

Route::post('register'  , 'AuthController@register');
Route::post('login'     , 'AuthController@login');

Route::group(['middleware' => 'jwt.verify','prefix' => 'auth'], function ($router) {
    Route::post('logout'            , 'AuthController@logout');
    Route::get('get-users'          , 'AuthController@getAllUser');
    Route::get('get-user-logged-in' , 'AuthController@getUser');
});
