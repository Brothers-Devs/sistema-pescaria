<?php

use App\Models\Fisherman;
use App\Models\Team;
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
        Schema::create('fisherman_team', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id');
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade');
            $table->foreignId('fisherman_id')->constrained('fishermen')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fisherman_team');
    }
};
