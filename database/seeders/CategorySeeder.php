<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            'name' => 'Categoria Especial - Modalidade Arremesso',
            'created_at' => Carbon::now()
        ]);

        DB::table('categories')->insert([
            'name' => 'Categoria Comum - Modalidade Arremesso e Corrico',
            'created_at' => Carbon::now()
        ]);
    }
}
