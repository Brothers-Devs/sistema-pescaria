<?php

namespace App\Repositories\Fisherman;

use stdClass;

interface FishermanRepositoryInterface
{
    public function all(): array;

    public function getById(int $id): ?stdClass;
}
