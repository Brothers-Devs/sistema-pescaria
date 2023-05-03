<?php

namespace App\Helper;

class Helper
{
    /**
     * @param string $mask
     * @param string $value
     * @return string
     */
    public static function addMask(string $mask, string $value): string
    {
        $mask = str_replace('#', '%s', $mask);
        return vsprintf($mask, str_split($value));
    }

    /**
     * @param string $value
     * @return string
     */
    public static function addMaskForCpf(string $value): string
    {
        if (strlen($value) === 11) {
            return self::addMask('###.###.###-##', $value);
        }

        return $value;
    }

    /**
     * @param string $value
     * @return string
     */
    public static function addMaskForPhoneBr(string $value): string
    {
        $value = self::onlyNumbers($value);

        if (strlen($value) === 11) {
            return self::addMask('(##) #####-####', $value);
        }

        if (strlen($value) === 10) {
            return self::addMask('(##) 9####-####', $value);
        }

        if (strlen($value) === 8) {
            return self::addMask('9####-####', $value);
        }


        return $value;
    }

    /**
     * @param string $value
     * @return array|string|null
     */
    public static function onlyNumbers(string $value): array|string|null
    {
        return preg_replace('/[^0-9]/', '', $value);
    }
}
