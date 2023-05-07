<?php

namespace App\Repositories\Team\Eloquent;

use App\DTO\Team\CreateTeamDTO;
use App\DTO\Team\UpdateTeamDTO;
use App\Models\Team;
use App\Repositories\Team\TeamRepositoryInterface;
use stdClass;

class TeamRepository implements TeamRepositoryInterface
{
    public function __construct(
        protected Team $model
    )
    {
    }

    /**
     * @return array
     */
    public function all(): array
    {
        return $this->model->all()->toArray();
    }

    /**
     * @param int $id
     * @return stdClass|null
     */
    public function getById(int $id): ?stdClass
    {
        $team = $this->model->find($id);
        if (!$team) {
            return null;
        }

        return (object)$team->toArray();
    }

    /**
     * @param CreateTeamDTO $createTeamDTO
     * @return stdClass
     */
    public function create(CreateTeamDTO $createTeamDTO): stdClass
    {
        return (object)$this->model->create($createTeamDTO->toArray())->toArray();
    }

    /**
     * @param UpdateTeamDTO $updateTeamDTO
     * @return stdClass|null
     */
    public function update(UpdateTeamDTO $updateTeamDTO): ?stdClass
    {
        /** @var Team $team */
        $team = $this->model->find($updateTeamDTO->id);
        if (!$team) {
            return null;
        }

        $team->update($updateTeamDTO->toArray());

        return (object)$team->toArray();
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $this->model->findOrFail($id)->delete();
    }
    
    public function getByIdWithFishermen(int $id)
    {
        return $this->model->with('fishermen')->findOrFail($id);
    }
}
