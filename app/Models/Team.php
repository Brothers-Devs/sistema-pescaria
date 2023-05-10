<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'tournament_id',
        'category_id'
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
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsToMany
     */
    public function fishermen(): BelongsToMany
    {
        return $this->belongsToMany(Fisherman::class)
            ->using(FishermanTeam::class)
            ->withPivot('tournament_id')
            ->withTimestamps();
    }

    /**
     * @return HasMany
     */
    public function fisheries(): HasMany
    {
        return $this->hasMany(Fishing::class);
    }
}
