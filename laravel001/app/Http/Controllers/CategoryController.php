<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //

    /**
     * @OA\Get(
     *     path="/api/categories",
     *     summary="Retrieve a list of categories",
     *     tags={"Category"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Data kategori berhasil diambil",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Data kategori berhasil diambil"),
     *             @OA\Property(property="status", type="string", example="OK")
     *         )
     *     )
     * )
     */
    function list()
    {
        $response = [];
        $data = Category::all();
        $response['message'] = 'Data kategori berhasil diambil';
        $response['status'] = 'OK';
        $response['data'] = $data;
        return json_encode($response);
    }
}
