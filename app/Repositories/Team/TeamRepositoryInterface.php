<?php

namespace App\Repositories\Team;

use App\DTO\Team\CreateTeamDTO;
use App\DTO\Team\UpdateTeamDTO;
use stdClass;

interface TeamRepositoryInterface
{
    public function all(): array;

    public function getById(int $id): ?stdClass;

    public function create(CreateTeamDTO $createTeamDTO): stdClass;

    public function update(UpdateTeamDTO $updateTeamDTO): ?stdClass;

    public function delete(int $id): void;
}
