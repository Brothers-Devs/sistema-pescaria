<?php

namespace App\Repositories\Tournament\Eloquent;

use App\DTO\CreateTournamentDTO;
use App\Models\Tournament;
use App\Repositories\Tournament\TournamentRepositoryInterface;

class TournamentRepository implements TournamentRepositoryInterface
{
    public function __construct(
        protected Tournament $model
    )
    {
    }

    public function create(CreateTournamentDTO $createTournamentDTO)
    {
        return $this->model->create($createTournamentDTO->toArray());
    }
}
