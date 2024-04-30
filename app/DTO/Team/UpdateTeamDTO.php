<?php

namespace App\DTO\Team;

use App\Http\Requests\StoreUpdateTeamRequest;

class UpdateTeamDTO
{
    public function __construct(
        public int    $id,
        public string $name,
        public string $type,
        public int    $tournamentId,
        public ?int   $categoryId,
        public array  $fishermen = []
    ) {
    }

    /**
     * @param StoreUpdateTeamRequest $request
     * @param int $id
     * @return UpdateTeamDTO
     */
    public static function makeFromRequest(StoreUpdateTeamRequest $request, int $id): UpdateTeamDTO
    {
        return new self(
            $id,
            $request->name,
            $request->type,
            $request->tournament_id,
            $request->category_id ?? null,
            $request->fishermen ?? []
        );
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type,
            'tournament_id' => $this->tournamentId,
            'category_id' => $this->categoryId
        ];
    }
}
