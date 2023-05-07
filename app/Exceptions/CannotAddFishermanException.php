<?php

namespace App\Exceptions;

use Exception;

class CannotAddFishermanException extends Exception
{
    public $message = 'Não é permitido adicionar mais pescadores a esta equipe';
}
