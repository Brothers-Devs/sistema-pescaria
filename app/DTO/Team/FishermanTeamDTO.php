<?php

namespace App\DTO\Team;

use App\Http\Requests\AddRemoveFishermanInTeamRequest;

class FishermanTeamDTO
{
    public function __construct(
        public int $tournamentId,
        public int $teamId,
        public int $fishermanId
    )
    {
    }

    /**
     * @param AddRemoveFishermanInTeamRequest $request
     * @param int $teamId
     * @return FishermanTeamDTO
     */
    public static function makeFromRequest(AddRemoveFishermanInTeamRequest $request, int $teamId): FishermanTeamDTO
    {
        return new self(
            $request->tournament_id,
            $teamId,
            $request->fisherman_id
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
            'fisherman_id' => $this->fishermanId
        ];
    }
}
