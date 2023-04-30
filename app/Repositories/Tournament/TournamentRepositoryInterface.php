<?php

namespace App\Repositories\Tournament;

use App\DTO\Tournament\CreateTournamentDTO;
use App\DTO\Tournament\UpdateTournamentDTO;
use stdClass;

interface TournamentRepositoryInterface
{
    public function getById(string $id): ?stdClass;

    public function create(CreateTournamentDTO $createTournamentDTO): ?stdClass;

    public function update(UpdateTournamentDTO $updateTournamentDTO): ?stdClass;
}
