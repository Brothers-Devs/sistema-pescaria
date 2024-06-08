<?php

namespace App\Http\Controllers;

use App\Enum\TypesEnum;
use App\Services\FishermanService;
use App\Services\ResultService;
use App\Services\TeamService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ReportController extends Controller
{
    public function __construct(
        protected ResultService    $resultService,
        protected TeamService      $teamService,
        protected FishermanService $fishermanService
    )
    {
    }

    /**
     * @return Response
     */
    public function allTeams(): Response
    {
        $results = $this->teamService->all();

        $pdf = Pdf::loadView(
            'reports.teams.relatorio-geral-equipes',
            [
                'results' => $results
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-geral-equipes.pdf');
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

    /**
     * @param Request $request
     * @return Response
     */
    public function teamsRanking(Request $request): Response
    {
        Validator::validate($request->all(), [
            'type' => [
                'sometimes',
                Rule::in(TypesEnum::values())
            ]
        ]);

        $results = $this->resultService->teamsRanking($request->type);

        $pdf = Pdf::loadView(
            'reports.teams.relatorio-classificacao-final-de-equipes',
            [
                'results' => $results,
                'type' => $request->type
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-classificacao-final-de-equipes.pdf');
    }

    /**
     * @return Response
     */
    public function individualRankingBiggestFish(): Response
    {
        $results = $this->resultService->individualRankingBiggestFish();

        $pdf = Pdf::loadView(
            'reports.individual.relatorio-final-individual-maior-peixe',
            [
                'results' => $results,
            ]
        )->setOption([
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('relatorio-final-individual-maior-peixe.pdf');
    }
}
