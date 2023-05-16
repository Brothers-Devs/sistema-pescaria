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
        return $this->model->with('team.category')->get();
    }

    /**
     * @param int $id
     * @return array
     */
    public function getById(int $id): array
    {
        /** @var Result $result */
        $result = $this->model->findOrFail($id);
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

            $totalPoints = 0;
            foreach ($createResultDTO->fisheries as $fishery) {
                // TODO: Validar se pescador está vinculado a equipe
                $fishery['result_id'] = $result->id;
                $this->fishing->create($fishery);
                $totalPoints += $fishery['points'];
            }

            $result->fill(['total_points' => $totalPoints])->save();

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
        DB::transaction(function () use ($id) {
            /** @var Result $result */
            $result = $this->model->findOrFail($id);
            $result->fisheries()->delete();

            $result->delete();
        });
    }
}
