<?php

namespace App\DTO\Team;

use App\Http\Requests\AddFishermanInTeamRequest;

class AddFishermanDTO
{
    public function __construct(
        public int $tournamentId,
        public int $teamId,
        public int $fishermanId
    )
    {
    }

    /**
     * @param AddFishermanInTeamRequest $request
     * @param int $teamId
     * @return AddFishermanDTO
     */
    public static function makeFromRequest(AddFishermanInTeamRequest $request, int $teamId): AddFishermanDTO
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
