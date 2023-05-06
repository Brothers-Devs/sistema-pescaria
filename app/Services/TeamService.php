<?php

namespace App\Services;

use App\DTO\Team\CreateTeamDTO;
use App\Repositories\Team\TeamRepositoryInterface;
use GuzzleHttp\Promise\Create;
use stdClass;

class TeamService
{
    public function __construct(
        protected TeamRepositoryInterface $repository
    )
    {
    }

    /**
     * @return array
     */
    public function all(): array
    {
        return $this->repository->all();
    }

    /**
     * @param int $id
     * @return stdClass|null
     */
    public function getById(int $id): ?stdClass
    {
        return $this->repository->getById($id);
    }

    /**
     * @param CreateTeamDTO $createTeamDTO
     * @return stdClass
     */
    public function create(CreateTeamDTO $createTeamDTO): stdClass
    {
        return $this->repository->create($createTeamDTO);
    }
}
