<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Fishing extends Model
{
    use HasFactory;

    protected $table = 'fisheries';

    protected $fillable = [
        'size',
        'points',
        'weight',
        'stage',
        'fisherman_id',
        'team_id',
        'tournament_id'
    ];

    /**
     * @return BelongsTo
     */
    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    /**
     * @return BelongsTo
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * @return BelongsTo
     */
    public function fisherman(): BelongsTo
    {
        return $this->belongsTo(Fisherman::class);
    }
}
