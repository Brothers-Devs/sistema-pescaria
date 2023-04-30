<?php

namespace App\DTO;

use App\Http\Requests\StoreTournamentRequest;

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
     * @param StoreTournamentRequest $request
     * @return CreateTournamentDTO
     */
    public static function makeFromRequest(StoreTournamentRequest $request): CreateTournamentDTO
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
