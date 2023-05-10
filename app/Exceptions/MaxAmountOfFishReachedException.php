<?php

namespace App\Exceptions;

use Exception;

class MaxAmountOfFishReachedException extends Exception
{
    protected $message = 'Quantidade máxima de peixes atingida. Máximo 12';
}
