<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Services\ResultService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function __construct(
        protected ResultService $resultService
    )
    {
    }

    public function all(Request $request)
    {
        $results = $this->resultService->all();
        //dd($results);
        $pdf = Pdf::loadView('reports.geral', ['results' => $results]);
        return $pdf->download('relatorio-geral.pdf');
    }
}
