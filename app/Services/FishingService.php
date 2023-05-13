<?php

namespace App\Services;

use App\DTO\Fishing\CreateFishingDTO;
use App\DTO\Fishing\UpdateFishingDTO;
use App\Exceptions\FishermanNotFoundOnTheTeamException;
use App\Exceptions\MaxAmountOfFishReachedException;
use App\Models\Fisherman;
use App\Models\Fishing;
use App\Models\Team;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class FishingService
{
    public const MAX_AMOUNT_OF_FISH = 12;

    public function __construct(
        protected Fishing $model
    )
    {
    }

    /**
     * @param CreateFishingDTO $createFishingDTO
     * @return mixed
     * @throws FishermanNotFoundOnTheTeamException
     * @throws MaxAmountOfFishReachedException
     */
    public function create(CreateFishingDTO $createFishingDTO): mixed
    {
        $fisherman = Fisherman::with('teams')->find($createFishingDTO->fishermanId);
        if (!$fisherman->teams->contains($createFishingDTO->teamId)) {
            Log::alert(
                'fisherman_not_found_on_the_team',
                [
                    'action' => 'create_fishing',
                    'team_id' => $createFishingDTO->teamId,
                    'fisherman_id' => $createFishingDTO->fishermanId
                ]
            );
            throw new FishermanNotFoundOnTheTeamException();
        }

        $team = Team::find($createFishingDTO->teamId);
        $team->load([
            'fisheries' => function (Builder $builder) use ($createFishingDTO) {
                $builder->where('team_id', '=', $createFishingDTO->teamId);
            }
        ]);

        if ($team->fisheries->count() == self::MAX_AMOUNT_OF_FISH) {
            Log::alert(
                'max_amount_of_fish_reached',
                [
                    'action' => 'create_fishing',
                    'team_id' => $createFishingDTO->teamId,
                    'fisherman_id' => $createFishingDTO->fishermanId
                ]
            );
            throw new MaxAmountOfFishReachedException();
        }

        return $this->model->create($createFishingDTO->toArray());
    }


    /**
     * @param UpdateFishingDTO $fishingDTO
     * @return mixed
     * @throws FishermanNotFoundOnTheTeamException
     */
    public function update(UpdateFishingDTO $fishingDTO): mixed
    {
        $fisherman = Fisherman::with('teams')->find($fishingDTO->fishermanId);
        if (!$fisherman->teams->contains($fishingDTO->teamId)) {
            Log::alert(
                'fisherman_not_found_on_the_team',
                [
                    'action' => 'update_fishing',
                    'team_id' => $fishingDTO->teamId,
                    'fisherman_id' => $fishingDTO->fishermanId
                ]
            );
            throw new FishermanNotFoundOnTheTeamException();
        }

        $fishing = $this->model->findOrFail($fishingDTO->id);
        $fishing->update($fishingDTO->toArray());
        return $fishing->toArray();
    }

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $this->model->findOrFail($id)->delete();
    }

    /**
     * Converter tamanho(cm) em pontos. Os arredondamentos serão sempre para baixo.
     *
     * @param float $size
     * @return float points
     */
    public function convertSizeInPoints(float $size): float
    {
        return floor($size * 2) / 2;
    }
}
