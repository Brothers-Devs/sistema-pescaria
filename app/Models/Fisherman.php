<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Fisherman extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cpf',
        'phone',
        'email',
        'country',
        'state',
        'city'
    ];

    /**
     * @return BelongsToMany
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class)->using(FishermanTeam::class);
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
    protected function cpf(): Attribute
    {
        return Attribute::make(
            get: fn(?string $value) => $value ? Helper::addMaskForCpf($value) : null,
            set: fn(?string $value) => $value ? Helper::onlyNumbers($value) : null
        );
    }

    /**
     * @return Attribute
     */
    protected function phone(): Attribute
    {
        return Attribute::make(
            get: fn(?string $value) => $value ? Helper::addMaskForPhoneBr($value) : null,
            set: fn(?string $value) => $value ? Helper::onlyNumbers($value) : null
        );
    }
}
