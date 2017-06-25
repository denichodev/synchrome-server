<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()
                    ->json([
                        'error' => ['user_not_found']
                    ], 404);
            }
        } catch (TokenInvalidException $e) {
            return response()
                ->json([
                    'error' => ['invalid_token'],
                ], 400);
        }

        return $next($request);
    }
}
