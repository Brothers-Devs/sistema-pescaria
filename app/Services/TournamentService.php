<?php

namespace App\Services;

use App\DTO\CreateTournamentDTO;
use App\Repositories\Tournament\TournamentRepositoryInterface;

class TournamentService
{
    public function __construct(
        protected TournamentRepositoryInterface $repository
    )
    {

    }

    public function create(CreateTournamentDTO $createTournamentDTO)
    {
        return $this->repository->create($createTournamentDTO);
    }
}
