<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $service
    )
    {
    }

    /**
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        return response()->json([
            'data' => $this->service->all()
        ], Response::HTTP_OK);
    }
}
