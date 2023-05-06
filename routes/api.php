<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FishermanController;
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

Route::get('/tournaments/{tournament_id}', [TournamentController::class, 'getById'])->name('tournaments.getById');
Route::post('/tournaments', [TournamentController::class, 'store'])->name('tournaments.store');
Route::put('/tournaments/{tournament_id}', [TournamentController::class, 'update'])->name('tournaments.update');
Route::delete('/tournaments/{tournament_id}', [TournamentController::class, 'delete'])->name('tournaments.delete');

Route::get('/categories', [CategoryController::class, 'all'])->name('categories.all');

Route::get('/fishermen', [FishermanController::class, 'all'])->name('fishermen.all');
Route::get('/fishermen/{fisherman_id}', [FishermanController::class, 'getById'])->name('fishermen.getById');
Route::post('/fishermen', [FishermanController::class, 'store'])->name('fishermen.store');
Route::put('/fishermen/{fisherman_id}', [FishermanController::class, 'update'])->name('fishermen.update');
Route::delete('/fishermen/{fisherman_id}', [FishermanController::class, 'delete'])->name('fishermen.delete');

Route::get('/teams', [TeamController::class, 'all'])->name('teams.all');
Route::get('/teams/{team_id}', [TeamController::class, 'getById'])->name('teams.getById');
Route::post('/teams', [TeamController::class, 'create'])->name('teams.create');
Route::put('/teams/{team_id}', [TeamController::class, 'update'])->name('teams.update');
