<?php

namespace App\Http\Controllers;

use App\Http\Resources\FishermanResource;
use App\Services\FishermanService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class FishermanController extends Controller
{
    public function __construct(
        protected FishermanService $service
    )
    {
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function all(): AnonymousResourceCollection
    {
        return FishermanResource::collection($this->service->all());
    }

    /**
     * @param int $id
     * @return FishermanResource
     */
    public function getById(int $id): FishermanResource
    {
        $fisherman = $this->service->getById($id);
        if (!$fisherman) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return new FishermanResource($fisherman);
    }
}
