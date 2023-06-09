<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Fishing extends Model
{
    use HasFactory;

    protected $table = 'fisheries';

    protected $fillable = [
        'result_id',
        'fisherman_id',
        'size',
        'points',
        'weight',
        'stage'
    ];

    /**
     * @return BelongsTo
     */
    public function result(): BelongsTo
    {
        return $this->belongsTo(Result::class);
    }

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

    /**
     * @return Attribute
     */
    public function points(): Attribute
    {
        return Attribute::make(
            get: fn(float $value) => number_format($value, '1', '.', ',')
        );
    }

    /**
     * @return Attribute
     */
    public function size(): Attribute
    {
        return Attribute::make(
            get: fn(float $value) => number_format($value, '2', '.', ',')
        );
    }
}
