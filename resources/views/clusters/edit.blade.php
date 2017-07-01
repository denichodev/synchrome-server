@extends('template')
@section('title', 'Clusters')
@section('description', 'Add/modify clusters')
@section('breadcrumb')
<li><a href="{{ route('dashboard') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
<li><a href="{{ route('clusters.index') }}"><i class="fa fa-cloud"></i> Clusters</a></li>
<li class="active"><a href="{{ route('clusters.edit', $cluster->id) }}"><i class="fa fa-plus"></i> Edit Cluster: {{ $cluster->name }}</a></li>
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
    <h4 class="box-title">Edit Cluster: {{ $cluster->name }}</h4>
  </div>
  <div class="box-body">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <form action="{{ route('clusters.update', $cluster->id) }}" method="POST">
          {{ csrf_field() }}
          <input type="hidden" name="_method" value="PATCH">
          <div class="form-group">
            <label for="name">Cluster Name</label>
            <input type="text" name="name" class="form-control" value="{{ $cluster->name }}" required>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</div>
<div class="box">
  <div class="box-header with-border">
    <h4 class="box-title">Keys for {{ $cluster->name }}</h4>
  </div>
  <div class="box-body">
    <form action="{{ route('clusters.generate_key', $cluster->id) }}" method="POST">
      {{ csrf_field() }}
      <button type="submit" class="btn btn-primary">Generate New Key</button>
    </form>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th width="350">Key</th>
          <th>Created</th>
          <th>Taps</th>
          <th width="200">Status</th>
          <th width="200">Actions</th>
        </tr>
      </thead>
      <tbody>
        @foreach(($cluster->keys) as $key)
          <tr>
            <td>{{ $key->key }}</td>
            <td>{{ date_create($key->created_at)->format('j F Y @ H:i') }}</td>
            <td>0</td>
            <td>
              @if($key->status)
                <span class="label label-success">Active</span>
              @else
                <span class="label label-default">Inactive</span>
              @endif
            </td>
            <td>
              @if($key->status)
                <form action="{{ route('clusters.disable_key', $key->id) }}" method="POST">
                  {{ csrf_field() }}
                  <button type="submit" class="btn btn-danger btn-xs">Disable</button>
                </form>
              @endif
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>
  </div>
</div>
@endsection