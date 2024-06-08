<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FishermanController;
use App\Http\Controllers\FishingController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

# Torneios
Route::get('/tournaments/{tournament_id}', [TournamentController::class, 'getById'])->name('tournaments.getById');
Route::post('/tournaments', [TournamentController::class, 'store'])->name('tournaments.store');
Route::put('/tournaments/{tournament_id}', [TournamentController::class, 'update'])->name('tournaments.update');
Route::delete('/tournaments/{tournament_id}', [TournamentController::class, 'delete'])->name('tournaments.delete');

# Categorias
Route::get('/categories', [CategoryController::class, 'all'])->name('categories.all');

# Pescadores
Route::get('/fishermen', [FishermanController::class, 'all'])->name('fishermen.all');
Route::get('/fishermen/available', [FishermanController::class, 'listFishermenAvailable'])->name('fishermen.listFishermenAvailable');
Route::get('/fishermen/{fisherman_id}', [FishermanController::class, 'getById'])->name('fishermen.getById');
Route::post('/fishermen', [FishermanController::class, 'store'])->name('fishermen.store');
Route::put('/fishermen/{fisherman_id}', [FishermanController::class, 'update'])->name('fishermen.update');
Route::delete('/fishermen/{fisherman_id}', [FishermanController::class, 'delete'])->name('fishermen.delete');

# Equipes
Route::get('/teams', [TeamController::class, 'all'])->name('teams.all');
Route::get('/teams/available', [TeamController::class, 'listTeamsAvailable'])->name('teams.listTeamsAvailable');
Route::get('/teams/{team_id}', [TeamController::class, 'getById'])->name('teams.getById');
Route::post('/teams', [TeamController::class, 'create'])->name('teams.create');
Route::put('/teams/{team_id}', [TeamController::class, 'update'])->name('teams.update');
Route::delete('/teams/{team_id}', [TeamController::class, 'delete'])->name('teams.delete');
Route::get('/teams/{team_id}/results', [TeamController::class, 'getResults'])->name('teams.getResults');

# Equipe e Pescador
Route::get('/teams/{team_id}/fishermen', [TeamController::class, 'listFishermen'])->name('teams.listFishermen');
Route::post('/teams/{team_id}/fishermen', [TeamController::class, 'addFisherman'])->name('teams.addFisherman');
Route::delete('/teams/{team_id}/fishermen', [TeamController::class, 'removeFisherman'])->name('teams.removeFisherman');

# Pescarias
Route::get('/tournaments/{tournament_id}/fisheries', [TournamentController::class, 'listFisheries'])
    ->name('tournaments.listFisheries');
Route::get('/teams/{team_id}/fisheries', [TeamController::class, 'listFisheries'])
    ->name('teams.listFisheries');
Route::get('/teams/{team_id}/fisheries/{fisherman_id}', [FishermanController::class, 'listFisheries'])
    ->name('fishermen.listFisheries');
Route::post('/fishing', [FishingController::class, 'create'])->name('fishing.create');
Route::put('/fishing/{fishing_id}', [FishingController::class, 'update'])->name('fishing.update');
Route::delete('/fishing/{fishing_id}', [FishingController::class, 'delete'])->name('fishing.delete');

# Resultados
Route::get('/results', [ResultController::class, 'all'])->name('results.all');
Route::get('/results/teams-ranking', [ResultController::class, 'teamsRanking'])
    ->name('results.teamsRanking');
Route::get('/results/individual-ranking', [ResultController::class, 'individualRankingBiggestFish'])
    ->name('results.individualRankingBiggestFish');
Route::get('/results/{result_id}', [ResultController::class, 'getById'])->name('results.getById');
Route::post('/results', [ResultController::class, 'create'])->name('results.create');
Route::delete('/results/{result_id}', [ResultController::class, 'delete'])->name('results.delete');
Route::get('/results/categories/{category_id}', [ResultController::class, 'rankingByCategoryId'])
    ->name('results.rankingByCategoryId');
Route::get('/results/categories/{category_id}/individual', [ResultController::class, 'rankingSingleBiggestFishByCategoryId'])
    ->name('results.rankingSingleBiggestFishByCategoryId');

# Relatórios
# Route::get('/reports/categories', [ReportController::class, 'all'])->name('reports.all');
Route::get('/reports/categories/{category_id}', [ReportController::class, 'rankingByCategoryId'])->name('reports.rankingByCategoryId');
Route::get('/reports/categories/{category_id}/individual', [ReportController::class, 'rankingSingleBiggestFishByCategoryId'])->name('reports.rankingSingleBiggestFishByCategoryId');
Route::get('/reports/results/{result_id}', [ReportController::class, 'getResultByResultId'])->name('reports.getResultByResultId');
Route::get('/reports/teams', [ReportController::class, 'allTeams'])->name('reports.allTeams');
Route::get('/reports/fishermen', [ReportController::class, 'allFishermen'])->name('reports.allFishermen');
