<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class FishermanTeam extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'tournament_id',
        'team_id',
        'fisherman_id'
    ];

    public $incrementing = true;
}
