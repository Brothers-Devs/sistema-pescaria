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
            'cpf' => fake()->randomElement(['48723707089', '29656940059']),
            'phone' => '91999999999',
            'email' => fake()->unique()->safeEmail(),
            'country' => fake()->country(),
            'state' => fake()->randomElement(['PA', 'SP', 'RJ']),
            'city' => fake()->city()
        ];
    }
}
