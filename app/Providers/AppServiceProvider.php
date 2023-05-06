<?php

namespace App\Providers;

use App\Repositories\Category\CategoryRepositoryInterface;
use App\Repositories\Category\Eloquent\CategoryRepository;
use App\Repositories\Fisherman\Eloquent\FishermanRepository;
use App\Repositories\Fisherman\FishermanRepositoryInterface;
use App\Repositories\Team\Eloquent\TeamRepository;
use App\Repositories\Team\TeamRepositoryInterface;
use App\Repositories\Tournament\Eloquent\TournamentRepository;
use App\Repositories\Tournament\TournamentRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TournamentRepositoryInterface::class, TournamentRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(FishermanRepositoryInterface::class, FishermanRepository::class);
        $this->app->bind(TeamRepositoryInterface::class, TeamRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
