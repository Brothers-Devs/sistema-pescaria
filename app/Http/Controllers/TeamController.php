<?php

namespace App\Http\Controllers;

use App\DTO\Team\CreateTeamDTO;
use App\Http\Requests\StoreUpdateTeamRequest;
use App\Http\Resources\TeamResource;
use App\Services\TeamService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class TeamController extends Controller
{
    public function __construct(
        protected TeamService $service
    )
    {
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function all(): AnonymousResourceCollection
    {
        return TeamResource::collection($this->service->all());
    }

    /**
     * @param int $id
     * @return TeamResource
     */
    public function getById(int $id): TeamResource
    {
        $team = $this->service->getById($id);
        if (!$team) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return new TeamResource($team);
    }

    /***
     * @param StoreUpdateTeamRequest $request
     * @return JsonResponse
     */
    public function create(StoreUpdateTeamRequest $request): JsonResponse
    {
        $team = $this->service->create(CreateTeamDTO::makeFromRequest($request));
        return (new TeamResource($team))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
