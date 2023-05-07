<?php

namespace App\Exceptions;

use Exception;

class FishermanNotFoundOnTheTeamException extends Exception
{
    protected $message = 'Pescador não encontrado na equipe';
}
