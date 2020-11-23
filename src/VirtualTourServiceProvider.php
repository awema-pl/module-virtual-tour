<?php

namespace AwemaPL\VirtualTour;

use AwemaPL\Packaginator\Sections\Installations\Http\Middleware\GlobalMiddleware;
use AwemaPL\Packaginator\Sections\Installations\Http\Middleware\GroupMiddleware;
use AwemaPL\Packaginator\Sections\Installations\Http\Middleware\Installation;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use AwemaPL\VirtualTour\Tour;
use AwemaPL\BaseJS\AwemaProvider;
use Illuminate\Cookie\Middleware\EncryptCookies;

class VirtualTourServiceProvider extends AwemaProvider
{

    public function boot()
    {
//        if (!empty($migrations = $this->getMigrations())) {
//            $this->publishes($migrations, 'migrations');
//        }
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

      $this->bootMiddleware();

        $this->app->resolving(EncryptCookies::class, function ($object) {
            $object->disableFor(['virtual-tour']);
        });

        $this->app->bind('awema-pl_virtual-tour', Tour::class);

        parent::boot();
    }

    public function getPackageName(): string
    {
        return 'virtual-tour';
    }

    public function getPath(): string
    {
        return __DIR__;
    }


    /**
     * Prepare migrations for publish
     *
     * @return array
     */
    protected function getMigrations(): array
    {
        $stubs = [
            'create_tours_table',
        ];
        $migrations = [];
        $i = 0;
        foreach ($stubs as $stub) {
            if (!class_exists(Str::studly($stub))) {
                $migrations[__DIR__ . '/../database/migrations/' . $stub . '.php.stub'] =
                    database_path('migrations/' . date('Y_m_d_His', time() + $i++) . '_' . $stub . '.php');
            }
        }

        return $migrations;
    }

    /**
     * Boot middleware
     *
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function bootMiddleware()
    {
        $this->bootGroupMiddleware();
    }

    /**
     * Boot group middleware
     *
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function bootGroupMiddleware()
    {
        $this->app->make(\Illuminate\Contracts\Http\Kernel::class)
            ->appendMiddlewareToGroup('web', TourMiddleware::class);
    }
}
