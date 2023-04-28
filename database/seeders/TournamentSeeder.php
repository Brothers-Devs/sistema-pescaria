<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tournaments')
            ->insert([
                'name' => 'XII TOPAM - Torneio de pesca esportiva da Amazônia',
                'state' => 'PA',
                'city' => 'Tucuruí',
                'start_date' => '2023-05-24',
                'end_date' => '2023-05-24',
                'created_at' => Carbon::now()
            ]);
    }
}
