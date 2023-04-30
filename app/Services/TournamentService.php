<?php

namespace App\Services;

use App\DTO\Tournament\CreateTournamentDTO;
use App\DTO\Tournament\UpdateTournamentDTO;
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
     * @return stdClass|null
     */
    public function create(CreateTournamentDTO $createTournamentDTO): ?stdClass
    {
        return $this->repository->create($createTournamentDTO);
    }


    /**
     * @param UpdateTournamentDTO $updateTournamentDTO
     * @return stdClass|null
     */
    public function update(UpdateTournamentDTO $updateTournamentDTO): ?stdClass
    {
        return $this->repository->update($updateTournamentDTO);
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $this->repository->delete($id);
    }
}
