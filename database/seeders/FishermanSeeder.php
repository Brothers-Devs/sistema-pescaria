<?php

namespace Database\Seeders;

use App\Models\Fisherman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FishermanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Fisherman::factory(10)->create();
    }
}
