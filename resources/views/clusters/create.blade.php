@extends('template')
@section('title', 'Clusters')
@section('description', 'Add/modify clusters')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
<li class="breadcrumb-item"><a href="{{ route('clusters.index') }}">Clusters</a></li>
<li class="breadcrumb-item active">Add New Cluster</li>
@endsection

@section('content')
@if(count($errors) > 0)
  @foreach($errors->all() as $error)
    <div class="alert alert-warning">
      {{ $error }}
    </div>
  @endforeach
@endif
<div class="animated fadeIn">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Add New Cluster</div>
        <div class="card-block">
        <div class="box">
          <div class="box-body">
            <div class="row">
              <div class="col-md-12 col-md-offset-3">
                <form action="{{ route('clusters.store') }}" method="POST">
                  {{ csrf_field() }}
                  <div class="form-group">
                    <label for="name">Cluster Name</label>
                    <input type="text" name="name" class="form-control" required>
                  </div>
                  <button type="submit" class="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection