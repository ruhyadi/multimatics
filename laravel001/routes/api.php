<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/hallo', 'App\Http\Controllers\UserController@hallo');
Route::post('/register', 'App\Http\Controllers\UserController@register');
Route::post('/login', 'App\Http\Controllers\UserController@login');

Route::middleware("auth:sanctum")->group(function () {
    Route::get('/categories', 'App\Http\Controllers\CategoryController@list');
    Route::post('/books', 'App\Http\Controllers\BookController@addBook');
    Route::get('/books', 'App\Http\Controllers\BookController@list');
    Route::get('/books/{id}', 'App\Http\Controllers\BookController@detail');
    Route::post('/books/{id}', 'App\Http\Controllers\BookController@update');
    Route::delete('/books/{id}', 'App\Http\Controllers\BookController@delete');
});
