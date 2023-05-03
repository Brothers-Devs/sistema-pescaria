<?php

namespace App\Repositories\Fisherman\Eloquent;

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
        return $this->model->all()->toArray();
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
}
