<?php

namespace Database\Factories;

use App\Enum\TypesEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'type' => fake()->randomElement(TypesEnum::values()),
            'tournament_id' => 1
        ];
    }
}
