<?php

namespace App\Services;

use App\DTO\Fishing\CreateFishingDTO;
use App\DTO\Result\CreateResultDTO;
use App\Models\Result;
use App\Models\Team;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ResultService
{
    public function __construct(
        protected Result         $model,
        protected FishingService $fishingService
    )
    {
    }

    /**
     * @return Collection|array
     */
    public function all(): Collection|array
    {
        $results = $this->model->with('team.category')->get();
        $results->loadSum('fisheries as total_points', 'points');
        return $results;
    }

    /**
     * @param int $id
     * @return array
     */
    public function getById(int $id): array
    {
        /** @var Result $result */
        $result = $this->model->findOrFail($id);
        $result->loadSum('fisheries as total_points', 'points');
        $result->load(['team.category', 'fisheries.fisherman']);
        return $result->toArray();
    }

    /**
     * @param CreateResultDTO $createResultDTO
     * @return mixed
     */
    public function create(CreateResultDTO $createResultDTO): mixed
    {
        return DB::transaction(function () use ($createResultDTO) {
            /** @var Result $result */
            $result = $this->model->create($createResultDTO->toArray());

            foreach ($createResultDTO->fisheries as $fishery) {
                $fishery['team_id'] = $createResultDTO->teamId;
                $fishery['result_id'] = $result->id;
                $this->fishingService->create(CreateFishingDTO::makeFromArray($fishery));
            }

            $result->refresh();

            return $result->with('fisheries')->get();
        });
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $this->model->findOrFail($id)->delete();
    }

    /**
     * @param int $id
     * @return array
     */
    public function rankingByCategoryId(int $id): array
    {
        /** @var Result $results */
        $results = Result::join('teams', 'teams.id', '=', 'results.team_id')
            ->join('fisheries', 'fisheries.result_id', '=', 'results.id')
            ->select(
                'teams.id',
                'teams.name',
                'teams.type',
                DB::raw('SUM(fisheries.points) as total_points')
            )
            ->where('teams.category_id', $id)
            ->groupBy('teams.id')
            ->orderByDesc('total_points')
            ->get();

        foreach ($results as $result) {
            /** @var Team $team */
            $team = Team::with('fishermen:id,name')->find($result->id);
            $result->fishermen = $team->fishermen->toArray();
        }

        return $results->toArray();
    }

    /**
     * @param int $id
     * @return array
     */
    public function rankingSingleBiggestFishByCategoryId(int $id): array
    {
        /** @var Result $results */
        $results = Result::join('teams', 'teams.id', '=', 'results.team_id')
            ->join('fisheries', 'fisheries.result_id', '=', 'results.id')
            ->join('fishermen', 'fisheries.fisherman_id', '=', 'fishermen.id')
            ->select(
                'fishermen.id',
                'fishermen.name',
                'fishermen.city',
                'fishermen.state',
                'teams.id as team_id',
                'teams.name as team_name',
                'fisheries.size',
                'fisheries.points'
            )
            ->where('teams.category_id', $id)
            ->orderByDesc('fisheries.points')
            ->get();
        
        return $results->toArray();
    }
}
