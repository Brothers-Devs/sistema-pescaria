<?php

namespace App\Http\Controllers;

use App\DTO\Fishing\CreateFishingDTO;
use App\Exceptions\FishermanNotFoundOnTheTeamException;
use App\Exceptions\MaxAmountOfFishReachedException;
use App\Http\Requests\StoreUpdateFishingRequest;
use App\Services\FishingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FishingController extends Controller
{
    public function __construct(
        protected FishingService $service
    )
    {
    }

    /**
     * @param StoreUpdateFishingRequest $request
     * @return JsonResponse
     */
    public function create(StoreUpdateFishingRequest $request): JsonResponse
    {
        try {
            $fishing = $this->service->create(CreateFishingDTO::makeFromRequest($request));
            return response()->json(['data' => $fishing]);
        } catch (FishermanNotFoundOnTheTeamException|MaxAmountOfFishReachedException $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        $this->service->delete($id);
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
