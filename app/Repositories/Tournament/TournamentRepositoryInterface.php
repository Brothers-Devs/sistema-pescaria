<?php

namespace App\Repositories\Tournament;

use App\DTO\CreateTournamentDTO;
use stdClass;

interface TournamentRepositoryInterface
{
    public function getById(string $id): ?stdClass;

    public function create(CreateTournamentDTO $createTournamentDTO);
}
