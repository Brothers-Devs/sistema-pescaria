<?php

namespace App\Repositories\Fisherman\Eloquent;

use App\DTO\Fisherman\CreateFishermanDTO;
use App\DTO\Fisherman\UpdateFishermanDTO;
use App\Models\Fisherman;
use App\Repositories\Fisherman\FishermanRepositoryInterface;
use stdClass;

class FishermanRepository implements FishermanRepositoryInterface
{
    public function __construct(
        protected Fisherman $model
    )
    {
    }

    /**
     * @return array
     */
    public function all(): array
    {
        return $this->model->with(['teams'])->get()->toArray();
    }


    /**
     * @param int $id
     * @return stdClass|null
     */
    public function getById(int $id): ?stdClass
    {
        $fisherman = $this->model->find($id);
        if (!$fisherman) {
            return null;
        }

        return (object)$fisherman->toArray();
    }

    /**
     * @param CreateFishermanDTO $createFishermanDTO
     * @return stdClass|null
     */
    public function create(CreateFishermanDTO $createFishermanDTO): ?stdClass
    {
        return (object)$this->model->create($createFishermanDTO->toArray())->toArray();
    }

    /**
     * @param UpdateFishermanDTO $updateFishermanDTO
     * @return stdClass|null
     */
    public function update(UpdateFishermanDTO $updateFishermanDTO): ?stdClass
    {
        /** @var Fisherman $fisherman */
        $fisherman = $this->model->find($updateFishermanDTO->id);
        if (!$fisherman) {
            return null;
        }

        $fisherman->update($updateFishermanDTO->toArray());

        return (object)$fisherman->toArray();
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
