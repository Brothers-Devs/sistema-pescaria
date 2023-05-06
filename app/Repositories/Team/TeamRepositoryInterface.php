<?php

namespace App\Repositories\Team;

use App\DTO\Team\CreateTeamDTO;
use stdClass;

interface TeamRepositoryInterface
{
    public function all(): array;

    public function getById(int $id): ?stdClass;

    public function create(CreateTeamDTO $createTeamDTO): stdClass;
}
