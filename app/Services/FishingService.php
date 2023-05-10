<?php

namespace App\Services;

use App\DTO\Fishing\CreateFishingDTO;
use App\Exceptions\FishermanNotFoundOnTheTeamException;
use App\Models\Fisherman;
use App\Models\Fishing;
use Illuminate\Support\Facades\Log;

class FishingService
{
    public function __construct(
        protected Fishing $model
    )
    {
    }

    /**
     * @param CreateFishingDTO $createFishingDTO
     * @return mixed
     * @throws FishermanNotFoundOnTheTeamException
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

        return Fishing::create($createFishingDTO->toArray());
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
