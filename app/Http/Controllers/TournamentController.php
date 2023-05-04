<?php

namespace App\Http\Controllers;

use App\DTO\Tournament\CreateTournamentDTO;
use App\DTO\Tournament\UpdateTournamentDTO;
use App\Http\Requests\StoreUpdateTournamentRequest;
use App\Http\Resources\TournamentResource;
use App\Services\TournamentService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class TournamentController extends Controller
{
    public function __construct(
        protected TournamentService $service
    )
    {
    }

    /**
     * @param string $id
     * @return TournamentResource
     */
    public function getById(string $id): TournamentResource
    {
        if (!$result = $this->service->getById($id)) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return new TournamentResource($result);
    }

    /**
     * @param StoreUpdateTournamentRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateTournamentRequest $request): JsonResponse
    {
        $result = $this->service->create(CreateTournamentDTO::makeFromRequest($request));
        return (new TournamentResource($result))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * @param StoreUpdateTournamentRequest $request
     * @param int $id
     * @return TournamentResource
     */
    public function update(StoreUpdateTournamentRequest $request, int $id): TournamentResource
    {
        if (!$result = $this->service->update(UpdateTournamentDTO::makeFromRequest($request, $id))) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return new TournamentResource($result);
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
}
