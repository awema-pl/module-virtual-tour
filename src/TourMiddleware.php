<?php


namespace AwemaPL\VirtualTour;

use Closure;

class TourMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Tour::proceedCookie();

        return $next($request);
    }
}
