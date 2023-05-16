<?php

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
            $table->foreignId('result_id')->constrained('results')->onDelete('cascade');
            $table->foreignId('fisherman_id')->constrained('fishermen')->onDelete('cascade');
            $table->float('size');
            $table->float('points');
            $table->float('weight', 8, 3)->nullable();
            $table->integer('stage')->nullable()->comment('Representa a etapa, 1º ou 2º dia');
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
