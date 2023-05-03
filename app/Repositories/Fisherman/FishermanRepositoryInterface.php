<?php

namespace App\Repositories\Fisherman;

use App\DTO\Fisherman\CreateFishermanDTO;
use stdClass;

interface FishermanRepositoryInterface
{
    public function all(): array;

    public function getById(int $id): ?stdClass;

    public function create(CreateFishermanDTO $createFishermanDTO): ?stdClass;
}
