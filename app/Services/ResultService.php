<?php

namespace App\Services;

use App\DTO\Result\CreateResultDTO;
use App\Models\Fishing;
use App\Models\Result;
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
     * @param CreateResultDTO $createResultDTO
     * @return mixed
     */
    public function create(CreateResultDTO $createResultDTO): mixed
    {
        return DB::transaction(function () use ($createResultDTO) {
            /** @var Result $result */
            $result = $this->model->create($createResultDTO->toArray());

            foreach ($createResultDTO->fisheries as $fishery) {
                $fishery['result_id'] = $result->id;
                $this->fishing->create($fishery);
            }

            $result->refresh();

            return $result->with('fisheries')->get();
        });
    }
}
