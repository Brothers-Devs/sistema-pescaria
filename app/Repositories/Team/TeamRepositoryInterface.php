<?php

namespace App\Repositories\Team;

use stdClass;

interface TeamRepositoryInterface
{
    public function all(): array;

    public function getById(int $id): ?stdClass;
}
