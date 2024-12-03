<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    //
    /**
     * @OA\Post(
     *     path="/api/books",
     *     summary="Add a new book",
     *     tags={"Books"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="category_id", type="integer", example=1),
     *                 @OA\Property(property="title", type="string", example="Book Title"),
     *                 @OA\Property(property="stock", type="integer", example=10),
     *                 @OA\Property(property="borrow_date", type="string", format="date-time", example="2023-10-10 00:00:00"),
     *                 @OA\Property(property="image", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Data valid"),
     *             @OA\Property(property="status", type="string", example="OK")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="object"),
     *             @OA\Property(property="status", type="string", example="ERROR")
     *         )
     *     )
     * )
     */
    function addBook(Request $request)
    {
        $response = [];
        $rules = [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required',
            'stock' => 'required',
            'borrow_date' => 'required|after_or_equal:now',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
        $attributes = [
            'category_id' => 'ID Kategori',
            'title' => 'Judul Buku',
            'stock' => 'Stok Buku',
            'borrow_date' => 'Tanggal Pinjam',
            'image' => 'Gambar Buku'
        ];
        $message = [
            'required' => ':attribute harus diisi',
            'after_or_equal' => ':attribute harus setelah atau sama dengan hari ini',
            'image' => ':attribute harus berupa gambar',
            'mimes' => ':attribute harus berupa gambar dengan format jpeg, png, jpg, gif, atau svg',
            'max' => ':attribute tidak boleh lebih dari 2MB'
        ];

        $validator = Validator::make($request->all(), $rules, $message, $attributes);
        if ($validator->fails()) {
            $response['message'] = $validator->errors();
            $response['status'] = 'ERROR';
            return response()->json($response, 400);
        } else {
            // insert book to database
            $photo = $request->file('image');
            $photo->move(public_path('book_images'), $photo->getClientOriginalName());

            Book::create([
                'category_id' => $request->input('category_id'),
                'title' => $request->input('title'),
                'stock' => $request->input('stock'),
                // 'borrow_date' => $request->input('borrow_date'),
                'borrow_date' => Carbon::parse($request->input('borrow_date'))->format('Y-m-d H:i:s'),
                // 'image' => $request->file('image')->store('book_images', 'public')
                'image' => $request->file('image')->getClientOriginalName()
            ]);

            $response['message'] = 'Data valid';
            $response['status'] = 'OK';
            return response()->json($response, 200);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/books",
     *     summary="List all books with their categories",
     *     tags={"Books"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Data valid"
     *             )
     *         )
     *     )
     * )
     */
    function list()
    {
        $response = [];
        $data = Book::with('category')->get();
        $response['message'] = 'Data valid';
        $response['data'] = $data;
        return response()->json($response, 200);
    }

    function detail($id)
    {
        $response = [];
        $data = Book::with('category')->find($id);
        if ($data) {
            $response['message'] = 'Data valid';
            $response['data'] = $data;
            return response()->json($response, 200);
        } else {
            $response['message'] = 'Data tidak ditemukan';
            $response['status'] = 'ERROR';
            return response()->json($response, 404);
        }
    }
}
