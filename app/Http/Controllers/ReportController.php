<?php

namespace App\Http\Controllers;

use App\Services\FishermanService;
use App\Services\ResultService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReportController extends Controller
{
    public function __construct(
        protected ResultService    $resultService,
        protected FishermanService $fishermanService
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
     * @return Response
     */
    public function allFishermen(): Response
    {
        $results = $this->fishermanService->all();

        $pdf = Pdf::loadView(
            'reports.fishermen.relatorio-geral-pescadores',
            [
                'results' => $results
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-geral-pescadores.pdf');
    }

    /**
     * @param int $id
     * @return Response
     */
    public function getResultByResultId(int $id): Response
    {
        $results = $this->resultService->getById($id);

        $pdf = Pdf::loadView(
            'reports.teams.relatorio-final-por-equipe',
            [
                'results' => $results
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-final-por-equipe.pdf');
    }

    /**
     * @param int $id
     * @return Response
     */
    public function rankingByCategoryId(int $id): Response
    {
        $results = $this->resultService->rankingByCategoryId($id);

        $pdf = Pdf::loadView(
            'reports.teams.relatorio-final-de-equipes-por-categoria',
            [
                'results' => $results,
                'categoryId' => $id
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-final-de-equipes-por-categoria.pdf');
    }

    /**
     * @param int $id
     * @return Response
     */
    public function rankingSingleBiggestFishByCategoryId(int $id): Response
    {
        $results = $this->resultService->rankingSingleBiggestFishByCategoryId($id);

        $pdf = Pdf::loadView(
            'reports.individual.relatorio-final-individual-maior-peixe',
            [
                'results' => $results,
                'categoryId' => $id
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-final-individual-maior-peixe.pdf');
    }
}
