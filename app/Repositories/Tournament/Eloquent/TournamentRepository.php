<?php

namespace App\Repositories\Tournament\Eloquent;

use App\DTO\Tournament\CreateTournamentDTO;
use App\DTO\Tournament\UpdateTournamentDTO;
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

    /**
     * @param CreateTournamentDTO $createTournamentDTO
     * @return stdClass|null
     */
    public function create(CreateTournamentDTO $createTournamentDTO): ?stdClass
    {
        return (object)$this->model->create($createTournamentDTO->toArray())->toArray();
    }

    /**
     * @param UpdateTournamentDTO $updateTournamentDTO
     * @return stdClass|null
     */
    public function update(UpdateTournamentDTO $updateTournamentDTO): ?stdClass
    {
        $tournament = $this->model->find($updateTournamentDTO->id);
        if (!$tournament) {
            return null;
        }

        $tournament->update($updateTournamentDTO->toArray());

        return (object)$tournament->toArray();
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $this->model->findOrFail($id)->delete();
    }

    public function getByIdWithFisheries(int $id)
    {
        return $this->model->with('teams.fisheries')->findOrFail($id);
    }
}
