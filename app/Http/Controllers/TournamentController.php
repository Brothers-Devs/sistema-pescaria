<?php

namespace App\Http\Controllers;

use App\DTO\CreateTournamentDTO;
use App\Http\Requests\StoreTournamentRequest;
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
     * @param StoreTournamentRequest $request
     * @return TournamentResource
     */
    public function store(StoreTournamentRequest $request): TournamentResource
    {
        $result = $this->service->create(CreateTournamentDTO::makeFromRequest($request));
        return new TournamentResource($result);
    }
}
