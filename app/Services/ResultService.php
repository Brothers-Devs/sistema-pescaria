<?php

namespace App\Services;

use App\DTO\Result\CreateResultDTO;
use App\Models\Fishing;
use App\Models\Result;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ResultService
{
    public function __construct(
        protected Result  $model,
        protected Fishing $fishing
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
                // TODO: Validar se pescador está vinculado a equipe
                $fishery['result_id'] = $result->id;
                $this->fishing->create($fishery);
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
}
