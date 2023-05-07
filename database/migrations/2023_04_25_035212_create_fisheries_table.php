<?php

use App\Models\Tournament;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fisheries', function (Blueprint $table) {
            $table->id();
            $table->float('size');
            $table->float('points');
            $table->float('weight', 8, 3)->nullable();
            $table->integer('stage')->nullable()->comment('Representa a etapa, 1º ou 2º dia');
            $table->foreignId('fisherman_id')->constrained('fishermen');
            $table->foreignId('team_id')->constrained();
            $table->foreignIdFor(Tournament::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fisheries');
    }
};
