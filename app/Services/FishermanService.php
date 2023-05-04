<?php

namespace App\Services;

use App\DTO\Fisherman\CreateFishermanDTO;
use App\Repositories\Fisherman\FishermanRepositoryInterface;
use stdClass;

class FishermanService
{
    public function __construct(
        protected FishermanRepositoryInterface $repository
    )
    {
    }

    /**
     * @return array
     */
    public function all(): array
    {
        return $this->repository->all();
    }

    /**
     * @param int $id
     * @return stdClass|null
     */
    public function getById(int $id): ?stdClass
    {
        return $this->repository->getById($id);
    }

    /**
     * @param CreateFishermanDTO $createFishermanDTO
     * @return stdClass|null
     */
    public function create(CreateFishermanDTO $createFishermanDTO): ?stdClass
    {
        return $this->repository->create($createFishermanDTO);
    }
}
