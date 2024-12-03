<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            // insert user to database
            User::create([
                'name' => $request->input('nama'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'password' => bcrypt($request->input('password')),
            ]);

            $response['message'] = 'Data valid';
            $response['status'] = 'OK';
            return response()->json($response, 200);
        }

        return json_encode($response);
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="User login",
     *     description="Authenticate user and return access token",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Login berhasil"),
     *             @OA\Property(property="status", type="string", example="OK"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="access_token", type="string", example="Bearer token")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Login failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Login gagal"),
     *             @OA\Property(property="status", type="string", example="ERROR")
     *         )
     *     )
     * )
     */
    function login(Request $request)
    {
        $response = [];
        $data = Auth::attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ]);
        if ($data) {
            $user = Auth::user();
            $response['message'] = 'Login berhasil';
            $response['status'] = 'OK';
            $response['data'] = [
                "access_token" => "Bearer " . $user->createToken('token')->plainTextToken,
                "user" => $user
            ];
            return response()->json($response, 200);
        } else {
            $response['message'] = 'Login gagal';
            $response['status'] = 'ERROR';
            return response()->json($response, 400);
        }
    }
}
