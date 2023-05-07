<?php

namespace App\Exceptions;

use Exception;

class FishermanIsAlreadyOnTheTeamException extends Exception
{
    public $message = 'Pescador já pertence à esta equipe';
}
