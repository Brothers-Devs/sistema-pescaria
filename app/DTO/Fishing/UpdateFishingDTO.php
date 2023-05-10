<?php

namespace App\DTO\Fishing;

use App\Http\Requests\StoreUpdateFishingRequest;

class UpdateFishingDTO
{
    public function __construct(
        public int    $id,
        public int    $tournamentId,
        public int    $teamId,
        public int    $fishermanId,
        public float  $size,
        public float  $points,
        public ?float $weight = null,
        public ?int   $stage = null,
    )
    {
    }

    /**
     * @param StoreUpdateFishingRequest $request
     * @param int $id
     * @return UpdateFishingDTO
     */
    public static function makeFromRequest(StoreUpdateFishingRequest $request, int $id): UpdateFishingDTO
    {
        return new self(
            $id,
            tournamentId: $request->tournament_id,
            teamId: $request->team_id,
            fishermanId: $request->fisherman_id,
            size: $request->size,
            points: $request->points,
            weight: $request->weight,
            stage: $request->stage
        );
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'tournament_id' => $this->tournamentId,
            'team_id' => $this->teamId,
            'fisherman_id' => $this->fishermanId,
            'size' => $this->size,
            'points' => $this->points,
            'weight' => $this->weight,
            'stage' => $this->stage
        ];
    }
}
