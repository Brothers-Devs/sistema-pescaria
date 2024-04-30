<?php

namespace App\DTO\Team;

use App\Http\Requests\StoreUpdateTeamRequest;

class CreateTeamDTO
{
    public function __construct(
        public string $name,
        public string $type,
        public int    $tournamentId,
        public ?int   $categoryId,
        public array  $fishermen = []
    ) {
    }

    /**
     * @param StoreUpdateTeamRequest $request
     * @return CreateTeamDTO
     */
    public static function makeFromRequest(StoreUpdateTeamRequest $request): CreateTeamDTO
    {
        return new self(
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
