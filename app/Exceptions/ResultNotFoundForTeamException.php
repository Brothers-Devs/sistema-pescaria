<?php

namespace App\Exceptions;

class ResultNotFoundForTeamException extends BusinessException
{
    protected $message = 'Resultado não encontrado ou não pertence a equipe';
}
