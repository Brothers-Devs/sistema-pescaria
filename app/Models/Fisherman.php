<?php

namespace App\Models;

use App\Helper\Helper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
     * @return Attribute
     */
    protected function cpf(): Attribute
    {
        return Attribute::make(
            get: fn(?string $value) => $value ? Helper::addMaskForCpf($value) : null
        );
    }

    /**
     * @return Attribute
     */
    protected function phone(): Attribute
    {
        return Attribute::make(
            get: fn(?string $value) => $value ? Helper::addMaskForPhoneBr($value) : null
        );
    }
}
