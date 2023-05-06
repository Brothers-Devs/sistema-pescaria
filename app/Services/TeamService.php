<?php

namespace App\Services;

use App\Repositories\Team\TeamRepositoryInterface;
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
}
