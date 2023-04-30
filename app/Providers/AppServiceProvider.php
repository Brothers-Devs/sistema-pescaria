<?php

namespace App\Providers;

use App\Repositories\Category\CategoryRepositoryInterface;
use App\Repositories\Category\Eloquent\CategoryRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
