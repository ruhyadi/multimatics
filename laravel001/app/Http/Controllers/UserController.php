<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    function hallo()
    {
        $response = [
            'message' => 'Hallo, ini adalah response dari controller UserController',
            'status' => 'OK'
        ];
        return response()->json($response, 200);
    }

    function validasi(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'password' => 'required|min:6',
            'confirm_password' => 'required|same:password'
        ]);

        $response = [
            'message' => 'Data valid',
            'status' => 'OK'
        ];
        return response()->json($response, 200);
    }

    function register(Request $request)
    {
        // $request->validate([
        //     'nama' => 'required',
        //     'email' => 'required|email',
        //     'phone' => 'required|numeric',
        //     'password' => 'required|min:6',
        //     'confirm_password' => 'required|same:password'
        // ]);

        // $response = [
        //     'message' => 'Data valid',
        //     'status' => 'OK'
        // ];
        // return response()->json($response, 200);
        $response = [];
        $rules = [
            'nama' => 'required',
            'email' => 'required|email',
            'phone' => 'required|digits_between:10,12',
            'password' => 'required|min:6',
            'confirm_password' => 'required|same:password'
        ];
        $attributes = [
            'nama' => 'Nama',
            'email' => 'Email',
            'phone' => 'Nomor Telepon',
            'password' => 'Password',
            'confirm_password' => 'Konfirmasi Password'
        ];
        $messages = [
            'required' => ':attribute wajib diisi',
            'email' => ':attribute harus berupa email',
            'numeric' => ':attribute harus berupa angka',
            'min' => ':attribute minimal :min karakter',
            'same' => ':attribute harus sama dengan :other'
        ];

        $val = $request->validate($rules, $messages, $attributes);
        if($val->fails()) {
            $response['message'] = $val->errors();
            $response['status'] = 'ERROR';
            return response()->json($response, 400);
        } else {
            $response['message'] = 'Data valid';
            $response['status'] = 'OK';
            return response()->json($response, 200);
        }

        return json_encode($response);
    }
}
