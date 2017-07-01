@extends('template')
@section('title', 'Clusters')
@section('description', 'Add/modify clusters')
@section('breadcrumb')
<li><a href="{{ route('dashboard') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
<li><a href="{{ route('clusters.index') }}"><i class="fa fa-cloud"></i> Clusters</a></li>
<li class="active"><a href="{{ route('clusters.create') }}"><i class="fa fa-plus"></i> Add New Cluster</a></li>
@endsection

@section('content')
@if(count($errors) > 0)
  @foreach($errors->all() as $error)
    <div class="alert alert-warning">
      {{ $error }}
    </div>
  @endforeach
@endif
<div class="box">
  <div class="box-header with-border">
    <h4 class="box-title">Add New Cluster</h4>
  </div>
  <div class="box-body">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
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
@endsection