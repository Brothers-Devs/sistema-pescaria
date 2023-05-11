<?php

namespace App\Services;

use App\DTO\Team\FishermanTeamDTO;
use App\DTO\Team\CreateTeamDTO;
use App\DTO\Team\UpdateTeamDTO;
use App\Enum\TypesEnum;
use App\Exceptions\CannotAddFishermanException;
use App\Exceptions\FishermanIsAlreadyOnAnotherTeamException;
use App\Exceptions\FishermanIsAlreadyOnTheTeamException;
use App\Exceptions\FishermanNotFoundOnTheTeamException;
use App\Models\FishermanTeam;
use App\Models\Team;
use App\Repositories\Team\TeamRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        return DB::transaction(function () use ($createTeamDTO) {
            $team = $this->repository->create($createTeamDTO);

            foreach ($createTeamDTO->fishermen as $fisherman) {
                $this->addFisherman(new FishermanTeamDTO($team->tournament_id, $team->id, $fisherman));
            }

            return $team;
        });
    }

    /**
     * @param UpdateTeamDTO $updateTeamDTO
     * @return stdClass|null
     */
    public function update(UpdateTeamDTO $updateTeamDTO): ?stdClass
    {
        return DB::transaction(function () use ($updateTeamDTO) {
            /** @var Team $team */
            $team = $this->repository->getByIdWithFishermen($updateTeamDTO->id);
            $team->update($updateTeamDTO->toArray());

            foreach ($updateTeamDTO->fishermen as $fisherman) {
                $this->validateExistenceInFishermanTeam(new FishermanTeamDTO($team->tournament_id, $team->id, $fisherman));
            }

            $team->fishermen()
                ->syncWithPivotValues($updateTeamDTO->fishermen, ['tournament_id' => $updateTeamDTO->tournamentId]);
            $team->refresh();

            return (object)$team->toArray();
        });
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
     * @param int $teamId
     * @return Model|Collection|Builder|array|null
     */
    public function listFishermen(int $teamId): Model|Collection|Builder|array|null
    {
        return $this->repository->getByIdWithFishermen($teamId);
    }

    /**
     * @param int $teamId
     * @return Model|Collection|Builder|array|null
     */
    public function listFisheries(int $teamId): Model|Collection|Builder|array|null
    {
        return $this->repository->getByIdWithFisheries($teamId);
    }

    /**
     * @param FishermanTeamDTO $fishermanTeamDTO
     * @return bool
     * @throws CannotAddFishermanException
     * @throws FishermanIsAlreadyOnAnotherTeamException
     */
    public function addFisherman(FishermanTeamDTO $fishermanTeamDTO): bool
    {
        $this->validateExistenceInFishermanTeam($fishermanTeamDTO);

        /** @var Team $team */
        $team = $this->repository->getByIdWithFishermen($fishermanTeamDTO->teamId);

        $countFishermen = $team->fishermen->count();
        if (
            ($team->type == TypesEnum::DOUBLE_TEAM && $countFishermen == 2) ||
            ($team->type == TypesEnum::TRIO_TEAM && $countFishermen == 3)
        ) {
            Log::alert('cannot_add_fisherman', [
                'team_id' => $team->id,
                'team_type' => $team->type,
                'count_fishermen' => $countFishermen
            ]);
            throw new CannotAddFishermanException();
        }

        $team
            ->fishermen()
            ->attach($fishermanTeamDTO->fishermanId, ['tournament_id' => $fishermanTeamDTO->tournamentId]);

        Log::info('successfully_added_fisherman', $fishermanTeamDTO->toArray());
        return true;
    }

    /**
     * @param FishermanTeamDTO $fishermanTeamDTO
     * @return bool
     * @throws FishermanNotFoundOnTheTeamException
     */
    public function removeFisherman(FishermanTeamDTO $fishermanTeamDTO): bool
    {
        /** @var Team $team */
        $team = $this->repository->getByIdWithFishermen($fishermanTeamDTO->teamId);

        if (!$team->fishermen->contains($fishermanTeamDTO->fishermanId)) {
            Log::alert('fisherman_not_found_on_the_team', $fishermanTeamDTO->toArray());
            throw new FishermanNotFoundOnTheTeamException();
        }

        $team
            ->fishermen()
            ->detach($fishermanTeamDTO->fishermanId, ['tournament_id' => $fishermanTeamDTO->tournamentId]);

        Log::info('successfully_removed_fisherman', $fishermanTeamDTO->toArray());
        return true;
    }

    /**
     * @param FishermanTeamDTO $fishermanTeamDTO
     * @return bool
     * @throws FishermanIsAlreadyOnAnotherTeamException
     */
    public function validateExistenceInFishermanTeam(FishermanTeamDTO $fishermanTeamDTO): bool
    {
        $fisherman = FishermanTeam::where('fisherman_id', $fishermanTeamDTO->fishermanId)
            ->where('team_id', '!=', $fishermanTeamDTO->teamId)
            ->get();
        if (!$fisherman->isEmpty()) {
            Log::alert('fisherman_is_already_on_another_team', $fishermanTeamDTO->toArray());
            throw new FishermanIsAlreadyOnAnotherTeamException(
                "Pescador Nº {$fishermanTeamDTO->fishermanId} já está vinculado a outra equipe"
            );
        }

        return true;
    }
}
