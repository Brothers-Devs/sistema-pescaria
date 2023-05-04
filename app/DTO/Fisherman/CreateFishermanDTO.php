<?php

namespace App\DTO\Fisherman;

use App\Http\Requests\StoreUpdateFishermanRequest;
use Illuminate\Http\Request;

class CreateFishermanDTO
{
    public function __construct(
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
     * @return CreateFishermanDTO
     */
    public static function makeFromRequest(StoreUpdateFishermanRequest $request): CreateFishermanDTO
    {
        return new self(
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

