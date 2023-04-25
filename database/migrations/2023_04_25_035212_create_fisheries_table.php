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
            $table->float('size');
            $table->integer('points');
            $table->float('weight', 8, 3)->nullable();
            $table->foreignId('fisherman_id')->constrained('fishermen');
            $table->foreignId('team_id')->constrained();
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
