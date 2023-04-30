<?php

namespace App\DTO\Tournament;

use Illuminate\Http\Request;

class UpdateTournamentDTO
{
    public function __construct(
        public int     $id,
        public string  $name,
        public ?string $state,
        public ?string $city,
        public string  $startDate,
        public ?string $endDate
    )
    {
    }

    /**
     * @param Request $request
     * @param int $id
     * @return UpdateTournamentDTO
     */
    public static function makeFromRequest(Request $request, int $id): UpdateTournamentDTO
    {
        return new self(
            $id,
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
            'id' => $this->id,
            'name' => $this->name,
            'state' => $this->state,
            'city' => $this->city,
            'start_date' => $this->startDate,
            'end_date' => $this->endDate
        ];
    }
}
