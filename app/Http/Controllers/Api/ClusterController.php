<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cluster;
use App\Key;
use DB;
use Validator;

class ClusterController extends Controller
{
    public function index()
    {
        $clusters = Cluster::get(['id', 'name']);   

        return response()
            ->json([
                'result' => 'success',
                'data' => $clusters
            ]);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation
                ], 400);
        }

        try {
            DB::beginTransaction();
            $cluster = Cluster::create($request->all());
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => $cluster
                ]);
        } catch (\Exception $e) {
            DB::rollback();

            if (\App::environment('local')) {
                throw $e;
            }

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ]);
        }
    }

    public function get($id)
    {
        $cluster = Cluster::find($id);
        
        if (is_null($cluster)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['cluster_not_found']
                ], 404);
        }

        return response()
            ->json([
                'result' => 'success',
                'data' => $cluster
            ]);
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validation->fails()) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => $validation
                ], 400);
        }

        $cluster = Cluster::find($id);

        if (is_null($cluster)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['cluster_not_found']
                ], 404);
        }

        try {
            DB::beginTransaction();
            $cluster->update($request->all());
            DB::commit();

            return response()
                ->json([
                    'result' => 'success',
                    'data' => $cluster
                ]);
        } catch (\Exception $e) {
            DB::rollback();
            
            if (\App::environment('local')) {
                throw $e;
            }

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ]);
        }
    }

    public function destroy($id)
    {
        $cluster = Cluster::find($id);

        if (is_null($cluster)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['cluster_not_found']
                ], 404);
        }

        try {
            $keyIds = collect($cluster->keys)->map(function ($item) {
                return $item->id;
            });
            Key::whereIn('id', $keyIds)->delete();

            DB::beginTransaction();
            $cluster->delete();
            DB::commit();

            return response()
                ->json([
                    'result' => 'success'
                ]);
        } catch (\Exception $e) {
            DB::rollback();
            
            if (\App::environment('local')) {
                throw $e;
            }

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ]);
        }
    }

    public function keys($id)
    {
        $cluster = Cluster::find($id);
        
        if (is_null($cluster)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['cluster_not_found']
                ], 404);
        }

        return response()
            ->json([
                'result' => 'success',
                'data' => $cluster->keys
            ]);
    }

    public function generateKey($id)
    {
        $cluster = Cluster::find($id);

        if (is_null($cluster)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['cluster_not_found']
                ], 404);
        }

        if ($cluster->keys()->where('status', true)->count() > 0) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['active_key_exists']
                ], 500);
        }

        try {
            DB::beginTransaction();
            $cluster->keys()
                ->save(new Key(['key' => Key::generate(), 'status' => true]));
            DB::commit();

            return response()
                ->json([
                    'result' => 'success'
                ]);
        } catch (\Exception $e) {
            DB::rollback();
            
            if (\App::environment('local')) {
                throw $e;
            }

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ]);
       }
    }

    public function disableKey($keyId)
    {
        $key = Key::find($keyId);

        if (is_null($key)) {
            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => ['cluster_not_found']
                ], 404);
        }

        try {
            DB::beginTransaction();
            $key->update(['status' => false]);
            DB::commit();

            return response()
                ->json([
                    'result' => 'success'
                ]);
        } catch (\Exception $e) {
            DB::rollback();
            
            if (\App::environment('local')) {
                throw $e;
            }

            return response()
                ->json([
                    'result' => 'failed',
                    'errors' => [$e->getMessage()]
                ]);
        }
    }
}
