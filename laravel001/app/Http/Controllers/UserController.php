<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    function hallo()
    {
        return response()->json([
            'message' => 'Hallo, ini adalah response dari controller UserController',
            'status' => 'OK'
        ]);
    }
}
