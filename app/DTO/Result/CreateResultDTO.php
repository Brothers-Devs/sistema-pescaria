<?php

namespace App\DTO\Result;

use App\Http\Requests\StoreUpdateResultRequest;

class CreateResultDTO
{
    public function __construct(
        public int   $teamId,
        public array $fisheries = []
    )
    {
    }

    /**
     * @param StoreUpdateResultRequest $request
     * @return CreateResultDTO
     */
    public static function makeFromRequest(StoreUpdateResultRequest $request): CreateResultDTO
    {
        return new self(
            $request->team_id,
            $request->fisheries ?? []
        );
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'team_id' => $this->teamId
        ];
    }
}
