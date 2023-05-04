<?php

namespace App\Repositories\Fisherman;

use App\DTO\Fisherman\CreateFishermanDTO;
use App\DTO\Fisherman\UpdateFishermanDTO;
use stdClass;

interface FishermanRepositoryInterface
{
    public function all(): array;

    public function getById(int $id): ?stdClass;

    public function create(CreateFishermanDTO $createFishermanDTO): ?stdClass;

    public function update(UpdateFishermanDTO $updateFishermanDTO): ?stdClass;

    public function delete(int $id): void;
}
