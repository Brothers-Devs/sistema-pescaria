<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fishing extends Model
{
    use HasFactory;

    protected $fillable = [
        'size',
        'points',
        'weight',
        'stage',
        'fisherman_id',
        'team_id',
        'tournament_id'
    ];
}
