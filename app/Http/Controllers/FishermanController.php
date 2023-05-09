<?php

namespace App\Http\Controllers;

use App\DTO\Fisherman\CreateFishermanDTO;
use App\DTO\Fisherman\UpdateFishermanDTO;
use App\Exceptions\FishermanNotFoundOnTheTeamException;
use App\Http\Requests\StoreUpdateFishermanRequest;
use App\Http\Resources\FishermanResource;
use App\Services\FishermanService;
use Illuminate\Http\JsonResponse;
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

    /**
     * @param StoreUpdateFishermanRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateFishermanRequest $request): JsonResponse
    {
        $fisherman = $this->service->create(CreateFishermanDTO::makeFromRequest($request));
        return (new FishermanResource($fisherman))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * @param StoreUpdateFishermanRequest $request
     * @param int $id
     * @return FishermanResource
     */
    public function update(StoreUpdateFishermanRequest $request, int $id): FishermanResource
    {
        $fisherman = $this->service->update(UpdateFishermanDTO::makeFromRequest($request, $id));
        if (!$fisherman) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return new FishermanResource($fisherman);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        if (!$this->service->getById($id)) {
            abort(Response::HTTP_NOT_FOUND);
        }

        $this->service->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    /**
     * @param int $teamId
     * @param int $fishermanId
     * @return JsonResponse
     */
    public function listFisheries(int $teamId, int $fishermanId): JsonResponse
    {
        try {
            $fisheries = $this->service->listFisheries($teamId, $fishermanId);
            return response()->json(['data' => $fisheries]);
        } catch (FishermanNotFoundOnTheTeamException $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
