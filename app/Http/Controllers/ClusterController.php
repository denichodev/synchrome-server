<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cluster;
use App\Key;
use Validator;
use DB;

class ClusterController extends Controller
{
    public function index()
    {
        $clusters = Cluster::get();

        return view('clusters.index', compact('clusters'));
    }

    public function create()
    {
        return view('clusters.create');
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validation->fails()) {
            return redirect()
                ->back()
                ->withErrors($validation);
        }

        try {
            DB::beginTransaction();
            $cluster = Cluster::create($request->all());
            DB::commit();

            return redirect()
                ->route('clusters.edit', $cluster->id);
        } catch (\Exception $e) {
            DB::rollback();

            return redirect()
                ->back()
                ->withErrors(collect([$e->getMessage()]));
        }
    }

    public function edit($id)
    {
        $cluster = Cluster::find($id);

        if (is_null($cluster)) {
            abort(404);
        }

        return view('clusters.edit', compact('cluster'));
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validation->fails()) {
            return redirect()
                ->back()
                ->withErrors($validation);
        }

        $cluster = Cluster::find($id);

        if (is_null($cluster)) {
            abort(404);
        }

        try {
            DB::beginTransaction();
            $cluster->update($request->all());
            DB::commit();

            return redirect()
                ->route('clusters.edit', $cluster->id);
        } catch (\Exception $e) {
            DB::rollback();

            return redirect()
                ->back()
                ->withErrors(collect([$e->getMessage()]));
        }
    }

    public function destroy($id)
    {
        $cluster = Cluster::find($id);

        if (is_null($cluster)) {
            abort(404);
        }

        try {
            $keyIds = collect($cluster->keys)->map(function ($item) {
                return $item->id;
            });
            Key::whereIn('id', $keyIds)->delete();
            $cluster->delete();
        } catch (\Exception $e) {

        }

        return redirect()
            ->route('clusters.index');
    }

    public function generateKey($id)
    {
        $cluster = Cluster::find($id);

        if (is_null($cluster)) {
            abort(404);
        }

        if ($cluster->keys()->where('status', true)->count() > 0) {
           return redirect()
                ->back()
                ->withErrors(collect(['Unable to generate new key. An active key exists']));
        }

        try {
            DB::beginTransaction();
            $cluster->keys()
                ->save(new Key(['key' => Key::generate(), 'status' => true]));
            DB::commit();

            return redirect()
                ->route('clusters.edit', $id);
        } catch (\Exception $e) {
            DB::rollback();

                return redirect()
                    ->back()
                    ->withErrors(collect([$e->getMessage()]));
       }
    }

    public function disableKey($keyId)
    {
        $key = Key::find($keyId);

        if (is_null($key)) {
            abort(404);
        }

        try {
            DB::beginTransaction();
            $key->update(['status' => false]);
            DB::commit();

            return redirect()
                ->route('clusters.edit', $key->cluster_id);
        } catch (\Exception $e) {
            DB::rollback();

            return redirect()
                ->back()
                ->withErrors(collect([$e->getMessage()]));
        }
    }
}
