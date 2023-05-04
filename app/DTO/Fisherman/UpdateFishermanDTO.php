<?php

namespace App\DTO\Fisherman;

use App\Http\Requests\StoreUpdateFishermanRequest;

class UpdateFishermanDTO
{
    public function __construct(
        public int     $id,
        public string  $name,
        public ?string $cpf,
        public ?string $phone,
        public ?string $email,
        public ?string $country,
        public ?string $state,
        public ?string $city
    )
    {
    }

    /**
     * @param StoreUpdateFishermanRequest $request
     * @param int $id
     * @return UpdateFishermanDTO
     */
    public static function makeFromRequest(StoreUpdateFishermanRequest $request, int $id): UpdateFishermanDTO
    {
        return new self(
            $id,
            $request->name,
            $request->cpf,
            $request->phone,
            $request->email,
            $request->country,
            $request->state,
            $request->city
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
            'cpf' => $this->cpf,
            'phone' => $this->phone,
            'email' => $this->email,
            'country' => $this->country,
            'state' => $this->state,
            'city' => $this->city
        ];
    }
}
