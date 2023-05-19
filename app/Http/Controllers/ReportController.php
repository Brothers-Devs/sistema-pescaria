<?php

namespace App\Http\Controllers;

use App\Services\ResultService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        $pdf = Pdf::loadView('reports.geral', ['results' => $results]);
        return $pdf->download('relatorio-geral.pdf');
    }

    /**
     * @param int $id
     * @return Response
     */
    public function rankingByCategoryId(int $id): Response
    {
        $results = $this->resultService->rankingByCategoryId($id);

        $pdf = Pdf::loadView(
            'reports.teams.relatorio-final-por-equipe',
            [
                'results' => $results,
                'categoryId' => $id
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-final-por-equipe.pdf');
    }
}
