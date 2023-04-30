<?php

namespace App\Services;

use App\DTO\CreateTournamentDTO;
use App\Repositories\Tournament\TournamentRepositoryInterface;
use stdClass;

class TournamentService
{
    public function __construct(
        protected TournamentRepositoryInterface $repository
    )
    {

    }

    /**
     * @param string $id
     * @return stdClass|null
     */
    public function getById(string $id): ?stdClass
    {
        return $this->repository->getById($id);
    }

    /**
     * @param CreateTournamentDTO $createTournamentDTO
     * @return mixed
     */
    public function create(CreateTournamentDTO $createTournamentDTO): mixed
    {
        return $this->repository->create($createTournamentDTO);
    }
}
