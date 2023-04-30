<?php

namespace App\Repositories\Tournament\Eloquent;

use App\DTO\CreateTournamentDTO;
use App\Models\Tournament;
use App\Repositories\Tournament\TournamentRepositoryInterface;
use stdClass;

class TournamentRepository implements TournamentRepositoryInterface
{
    public function __construct(
        protected Tournament $model
    )
    {
    }

    /**
     * @param string $id
     * @return stdClass|null
     */
    public function getById(string $id): ?stdClass
    {
        $tournament = $this->model->find($id);
        if (!$tournament) {
            return null;
        }

        return (object)$tournament->toArray();
    }

    public function create(CreateTournamentDTO $createTournamentDTO)
    {
        return $this->model->create($createTournamentDTO->toArray());
    }
}
