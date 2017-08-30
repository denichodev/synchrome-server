<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
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
                        'result' => 'failed',
                        'errors' => ['user_not_found']
                    ], 404);
            }
        } catch (JWTException $e) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['token_required'],
                ], 400);
        } catch (TokenInvalidException $e) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['invalid_token'],
                ], 400);
        }

        return $next($request);
    }
}
