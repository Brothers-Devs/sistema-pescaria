<?php

namespace App\DTO\Tournament;

use App\Http\Requests\StoreUpdateTournamentRequest;

class CreateTournamentDTO
{
    public function __construct(
        public string  $name,
        public ?string $state,
        public ?string $city,
        public string  $startDate,
        public ?string $endDate
    )
    {
    }

    /**
     * @param StoreUpdateTournamentRequest $request
     * @return CreateTournamentDTO
     */
    public static function makeFromRequest(StoreUpdateTournamentRequest $request): CreateTournamentDTO
    {
        return new self(
            $request->name,
            $request->state,
            $request->city,
            $request->start_date,
            $request->end_date
        );
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'state' => $this->state,
            'city' => $this->city,
            'start_date' => $this->startDate,
            'end_date' => $this->endDate
        ];
    }
}
