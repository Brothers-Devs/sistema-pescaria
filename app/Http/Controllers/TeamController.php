<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeamResource;
use App\Services\TeamService;
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
}
