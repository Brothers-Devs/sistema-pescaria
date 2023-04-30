<?php

namespace App\Repositories\Tournament;

use App\DTO\CreateTournamentDTO;

interface TournamentRepositoryInterface
{
    public function create(CreateTournamentDTO $createTournamentDTO);
}
