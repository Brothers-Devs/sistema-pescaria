<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FishermanFactory extends Factory
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
            'cpf' => fake()->unique()->numerify('###########'),
            'phone' => fake()->numerify('919########'),
            'email' => fake()->unique()->safeEmail(),
            'country' => fake()->country(),
            'state' => fake()->randomElement(['PA', 'SP', 'RJ']),
            'city' => fake()->city()
        ];
    }
}
