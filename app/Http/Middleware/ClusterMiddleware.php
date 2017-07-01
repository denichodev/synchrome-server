<?php

namespace App\Http\Middleware;

use Closure;
use App\Key;
use DB;

class ClusterMiddleware
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
        $key = $request->get('key');

        if (empty($key)) {
            $this->logRequest($request, false);

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['API key required']
                ]);
        }

        if (Key::isValid($key)) {
            $this->logRequest($request, true);

            return $next($request);
        }

        $this->logRequest($request, false);

        return response()
            ->json([
                'result' => 'failed',
                'errors' => ['API key not found/expired']
            ]); 
    }

    private function logRequest($request, $status)
    {
        try {
            DB::beginTransaction();
            DB::table('taps')
                ->insert([
                    'key' => $request->get('key'),
                    'route' => $request->url(),
                    'status' => $status,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
        }
    }
}
