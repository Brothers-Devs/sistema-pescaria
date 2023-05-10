<?php

namespace App\DTO\Fishing;

use App\Http\Requests\StoreUpdateFishingRequest;

class CreateFishingDTO
{
    public function __construct(
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
     * @return CreateFishingDTO
     */
    public static function makeFromRequest(StoreUpdateFishingRequest $request): CreateFishingDTO
    {
        return new self(
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
