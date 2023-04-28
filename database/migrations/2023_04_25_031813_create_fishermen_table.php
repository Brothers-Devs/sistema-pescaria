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
        Schema::create('fishermen', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->char('cpf', 11)->nullable();
            $table->char('phone', 11)->nullable();
            $table->string('email')->nullable();
            $table->char('state', 2)->nullable();
            $table->string('city')->nullable();
            $table->foreignId('team_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fishermen');
    }
};
