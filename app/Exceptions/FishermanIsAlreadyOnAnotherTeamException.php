<?php

namespace App\Exceptions;

use Exception;

class FishermanIsAlreadyOnAnotherTeamException extends Exception
{
    public $message = 'Pescador já está vinculado a outra equipe';
}
