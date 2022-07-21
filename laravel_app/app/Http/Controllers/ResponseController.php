<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResponseController extends Controller
{
    // for client error
    public static function client($data){
        return response()->json([
            'success'   => false,
            'status'    => Response::HTTP_BAD_REQUEST,
            'result'      => $data
        ], Response::HTTP_BAD_REQUEST);
    }

    // for server error
    public static function serverError($data){
        return response()->json([
            'success'   => false,
            'status'    => Response::HTTP_INTERNAL_SERVER_ERROR,
            'result'      => $data
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }


    // for server error
    public static function unAuthorized($data){
        return response()->json([
            'success'   => false,
            'status'    => Response::HTTP_UNAUTHORIZED,
            'result'      => $data
        ], Response::HTTP_UNAUTHORIZED);
    }


    // for not found error
    public static function notFound($data){
        return response()->json([
            'success'   => false,
            'status'    => Response::HTTP_NOT_FOUND,
            'result'      => $data
        ], Response::HTTP_NOT_FOUND);
    }


    // for success action
    public static function success($data){
        return response()->json([
            'success'   => true,
            'status'    => Response::HTTP_OK,
            'result'      => $data
        ], Response::HTTP_OK);
    }
}
