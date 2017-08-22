@extends('template')
@section('title', 'Clusters')
@section('description', 'Add/modify clusters')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
<li class="breadcrumb-item active">Clusters</li>
@endsection

@section('content')
<!-- Default box -->
<div class="animated fadeIn">
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          @yield('title')
        </div>
        <div class="card-block">
          <div class="box">
            <div class="box-body">
              <div class="form-group pull-right">
                <a href="{{ route('clusters.create') }}" class="btn btn-primary"><i class="fa fa-plus"></i> &nbsp;Add New Cluster</a>
              </div>
              <div class="clearfix"></div>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Cluster Name</th>
                    <th>Registered Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @foreach($clusters as $cluster)
                  <tr>
                    <td>{{ $cluster->name }}</td>
                    <td>{{ date_create($cluster->created_at)->format('j F Y') }}</td>
                    <td>
                    <a href="{{ route('clusters.edit', $cluster->id) }}" class="btn btn-xs btn-primary">View/Edit</a>
                    <form action="{{ route('clusters.destroy', $cluster->id) }}" method="POST" style="display: inline">
                      {{ csrf_field() }}  
                      <input type="hidden" name="_method" value="DELETE">
                      <button type="submit" class="btn btn-xs btn-danger">Delete</button>
                    </form>
                    </td>
                  </tr>
                  @endforeach
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              {{ count($clusters) }} cluster(s)
            </div>
            <!-- /.box-footer-->
        </div>
    </div>
  </div>
</div>
@endsection

@push('head_scripts')
<!-- DataTables -->
<link rel="stylesheet" href="{{ asset('bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css') }}">
@endpush

@push('footer_scripts')
<script src="{{ asset('bower_components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js') }}"></script>
<!-- DataTables -->
<script src="{{ asset('bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script>
$(function () {
    $('#table').DataTable();
});
</script>
@endpush