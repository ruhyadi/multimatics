<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/hallo",
     *     summary="Get greeting message",
     *     tags={"User"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Hallo, ini adalah response dari controller UserController"),
     *             @OA\Property(property="status", type="string", example="OK")
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Register a new user",
     *     tags={"User"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="nama", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="john.doe@example.com"),
     *             @OA\Property(property="phone", type="string", example="081234567890"),
     *             @OA\Property(property="password", type="string", example="password123"),
     *             @OA\Property(property="confirm_password", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Data valid"),
     *             @OA\Property(property="status", type="string", example="OK")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="object"),
     *             @OA\Property(property="status", type="string", example="ERROR")
     *         )
     *     )
     * )
     */
    function register(Request $request)
    {
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

        $validator = Validator::make($request->all(), $rules, $messages, $attributes);
        if ($validator->fails()) {
            $response['message'] = $validator->errors();
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
