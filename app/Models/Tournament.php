<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tournament extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'state',
        'city',
        'start_date',
        'end_date'
    ];

    /**
     * @return HasMany
     */
    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }

    /**
     * @return HasMany
     *
     */
    public function fisheries(): HasMany
    {
        return $this->hasMany(Fishing::class);

    }

    protected function startDate(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::make($value)->format('d/m/Y')
        );
    }

    protected function endDate(): Attribute
    {
        return Attribute::make(
            get: fn(?string $value) => $value ? Carbon::make($value)->format('d/m/Y') : null
        );
    }
}
