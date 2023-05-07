<?php

namespace App\Services;

use App\DTO\Team\AddFishermanDTO;
use App\DTO\Team\CreateTeamDTO;
use App\DTO\Team\UpdateTeamDTO;
use App\Exceptions\CannotAddFishermanException;
use App\Exceptions\FishermanIsAlreadyOnTheTeamException;
use App\Models\Team;
use App\Repositories\Team\TeamRepositoryInterface;
use Illuminate\Support\Facades\Log;
use stdClass;

class TeamService
{
    public const DOUBLE_TEAM = 'DUPLA';
    public const TRIO_TEAM = 'TRIO';

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

    /**
     * @param UpdateTeamDTO $updateTeamDTO
     * @return stdClass|null
     */
    public function update(UpdateTeamDTO $updateTeamDTO): ?stdClass
    {
        return $this->repository->update($updateTeamDTO);
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $this->repository->delete($id);
    }

    /**
     * @param AddFishermanDTO $addFishermanDTO
     * @return bool
     * @throws CannotAddFishermanException
     * @throws FishermanIsAlreadyOnTheTeamException
     */
    public function addFisherman(AddFishermanDTO $addFishermanDTO): bool
    {
        /** @var Team $team */
        $team = $this->repository->getByIdWithFishermen($addFishermanDTO->teamId);

        $countFishermen = $team->fishermen->count();
        if (
            ($team->type == self::DOUBLE_TEAM && $countFishermen == 2) ||
            ($team->type == self::TRIO_TEAM && $countFishermen == 3)
        ) {
            Log::alert('cannot_add_fisherman', [
                'team_id' => $team->id,
                'team_type' => $team->type,
                'count_fishermen' => $countFishermen
            ]);
            throw new CannotAddFishermanException();
        }

        if ($team->fishermen->contains($addFishermanDTO->fishermanId)) {
            Log::alert('fisherman_is_already_on_the_team', $addFishermanDTO->toArray());
            throw new FishermanIsAlreadyOnTheTeamException();
        }

        $team
            ->fishermen()
            ->attach($addFishermanDTO->fishermanId, ['tournament_id' => $addFishermanDTO->tournamentId]);

        Log::info('successfully_added_fisherman', $addFishermanDTO->toArray());
        return true;
    }
}
