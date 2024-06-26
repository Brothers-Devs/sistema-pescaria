<?php

namespace App\Http\Controllers;

use App\DTO\Result\CreateResultDTO;
use App\Enum\TypesEnum;
use App\Http\Requests\StoreUpdateResultRequest;
use App\Services\ResultService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class ResultController extends Controller
{
    public function __construct(
        protected ResultService $service
    )
    {
    }

    /**
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $results = $this->service->all();
        return response()->json([
            'data' => $results
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        $results = $this->service->getById($id);
        return response()->json([
            'data' => $results
        ]);
    }

    /**
     * @param StoreUpdateResultRequest $request
     * @return mixed
     */
    public function create(StoreUpdateResultRequest $request): mixed
    {
        return $this->service->create(CreateResultDTO::makeFromRequest($request));
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

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function rankingByCategoryId(int $id): JsonResponse
    {
        return response()->json($this->service->rankingByCategoryId($id));
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function rankingSingleBiggestFishByCategoryId(int $id): JsonResponse
    {
        return response()->json($this->service->rankingSingleBiggestFishByCategoryId($id));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function teamsRanking(Request $request): JsonResponse
    {
       Validator::validate($request->all(), [
            'type' => [
                'sometimes',
                Rule::in(TypesEnum::values())
            ]
        ]);

        return response()->json($this->service->teamsRanking($request->type));
    }

    /**
     * @return JsonResponse
     */
    public function individualRankingBiggestFish(): JsonResponse
    {
        return response()->json($this->service->individualRankingBiggestFish());
    }
}
