<?php

namespace App\Services;

use App\DTO\Fisherman\CreateFishermanDTO;
use App\DTO\Fisherman\UpdateFishermanDTO;
use App\Exceptions\FishermanNotFoundOnTheTeamException;
use App\Models\Fisherman;
use App\Repositories\Fisherman\FishermanRepositoryInterface;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use stdClass;

class FishermanService
{
    public function __construct(
        protected FishermanRepositoryInterface $repository
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
     * @param CreateFishermanDTO $createFishermanDTO
     * @return stdClass|null
     */
    public function create(CreateFishermanDTO $createFishermanDTO): ?stdClass
    {
        return $this->repository->create($createFishermanDTO);
    }

    /**
     * @param UpdateFishermanDTO $updateFishermanDTO
     * @return stdClass|null
     */
    public function update(UpdateFishermanDTO $updateFishermanDTO): ?stdClass
    {
        return $this->repository->update($updateFishermanDTO);
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
     * @param int $fishermanId
     * @return array
     * @throws FishermanNotFoundOnTheTeamException
     */
    public function listFisheries(int $teamId, int $fishermanId): array
    {
        $fisherman = Fisherman::with('teams')->find($fishermanId);
        if (!$fisherman->teams->contains($teamId)) {
            Log::alert('fisherman_not_found_on_the_team', ['team_id' => $teamId, 'fisherman_id' => $fishermanId]);
            throw new FishermanNotFoundOnTheTeamException();
        }

        $fisherman->load([
            'teams' => function (Builder $builder) use ($teamId) {
                $builder->where('team_id', '=', $teamId);
            },
            'fisheries' => function (Builder $builder) use ($teamId) {
                $builder->where('team_id', '=', $teamId);
            }
        ]);

        return $fisherman->toArray();
    }
}
