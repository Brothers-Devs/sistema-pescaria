<?php

namespace App\Enum;

class TypesEnum
{
    const DOUBLE_TEAM = 'DUPLA';
    const TRIO_TEAM = 'TRIO';

    public static function values(): array
    {
        return [
            self::DOUBLE_TEAM,
            self::TRIO_TEAM
        ];
    }
}
