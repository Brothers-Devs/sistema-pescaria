<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class TournamentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'XIII TOPAM - Torneio de pesca esportiva da Amazônia',
            'state' => 'PA',
            'city' => 'Tucuruí',
            'start_date' => '2024-05-22',
            'end_date' => '2024-05-26',
            'created_at' => Carbon::now()
        ];
    }
}
