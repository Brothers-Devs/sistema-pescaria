<?php

namespace App\Http\Controllers;

use App\DTO\Team\FishermanTeamDTO;
use App\DTO\Team\CreateTeamDTO;
use App\DTO\Team\UpdateTeamDTO;
use App\Exceptions\CannotAddFishermanException;
use App\Exceptions\FishermanIsAlreadyOnAnotherTeamException;
use App\Exceptions\FishermanNotFoundOnTheTeamException;
use App\Http\Requests\AddRemoveFishermanInTeamRequest;
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
    ) {
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
        try {
            $team = $this->service->create(CreateTeamDTO::makeFromRequest($request));
            return (new TeamResource($team))
                ->response()
                ->setStatusCode(Response::HTTP_CREATED);
        } catch (CannotAddFishermanException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'errors' => [
                    [
                        $exception->getMessage()
                    ]
                ]
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * @param StoreUpdateTeamRequest $request
     * @param int $id
     * @return TeamResource
     */
    public function update(StoreUpdateTeamRequest $request, int $id): TeamResource
    {
        $team = $this->service->update(UpdateTeamDTO::makeFromRequest($request, $id));
        if (!$team) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return new TeamResource($team);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        $team = $this->service->getById($id);
        if (!$team) {
            abort(Response::HTTP_NOT_FOUND);
        }

        $this->service->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    /**
     * @param int $teamId
     * @return JsonResponse
     */
    public function listFishermen(int $teamId): JsonResponse
    {
        $team = $this->service->listFishermen($teamId);
        return response()->json(['data' => $team]);
    }

    /**
     * @param int $teamId
     * @return JsonResponse
     */
    public function listFisheries(int $teamId): JsonResponse
    {
        $team = $this->service->listFisheries($teamId);
        return response()->json(['data' => $team]);
    }

    /**
     * @param AddRemoveFishermanInTeamRequest $request
     * @param int $teamId
     * @return JsonResponse
     * @throws FishermanIsAlreadyOnAnotherTeamException
     */
    public function addFisherman(AddRemoveFishermanInTeamRequest $request, int $teamId): JsonResponse
    {
        try {
            $this->service->addFisherman(FishermanTeamDTO::makeFromRequest($request, $teamId));
            return response()->json([
                'message' => 'Pescador adicionado com sucesso'
            ]);
        } catch (CannotAddFishermanException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'errors' => [
                    [
                        $exception->getMessage()
                    ]
                ]
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * @param AddRemoveFishermanInTeamRequest $request
     * @param int $teamId
     * @return JsonResponse
     */
    public function removeFisherman(AddRemoveFishermanInTeamRequest $request, int $teamId): JsonResponse
    {
        try {
            $this->service->removeFisherman(FishermanTeamDTO::makeFromRequest($request, $teamId));
            return response()->json([
                'message' => 'Pescador removido com sucesso'
            ]);
        } catch (FishermanNotFoundOnTheTeamException $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function listTeamsAvailable(): AnonymousResourceCollection
    {
        return TeamResource::collection($this->service->listTeamsAvailable());
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function getResults(int $id): JsonResponse
    {
        $team = $this->service->getResults($id);
        return response()->json(['data' => $team]);
    }
}
