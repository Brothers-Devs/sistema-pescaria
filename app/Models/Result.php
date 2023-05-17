<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id'
    ];

    /**
     * @return BelongsTo
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * @return HasMany
     */
    public function fisheries(): HasMany
    {
        return $this->hasMany(Fishing::class);
    }

    /**
     * @return Attribute
     */
    public function totalPoints(): Attribute
    {
        return Attribute::make(
            get: fn(?float $value) => $value ? number_format($value, '2', '.', ',') : 0
        );
    }
}
