<?php

namespace App\Http\Controllers;

use App\DTO\Result\CreateResultDTO;
use App\Http\Requests\StoreUpdateResultRequest;
use App\Services\ResultService;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    public function __construct(
        protected ResultService $service
    )
    {
    }

    public function create(StoreUpdateResultRequest $request)
    {
        return $this->service->create(CreateResultDTO::makeFromRequest($request));
    }
}
