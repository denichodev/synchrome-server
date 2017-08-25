@extends('template')
@section('title', 'Employees')
@section('description', 'Add/modify employees data')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
<li class="breadcrumb-item active">Employees</li>
@endsection

@section('content')
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
                <a href="{{ route('employees.create') }}" class="btn btn-primary"><i class="fa fa-plus"></i> &nbsp;Add New Employee</a>
              </div>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Agency</th>
                    <th>Echelon</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @foreach($employees as $employee)
                    <tr>
                      <td>{{ $employee->name }}</td>
                      <td>{{ $employee->echelon->agency->name }}</td>
                      <td>{{ $employee->echelon->name }}</td>
                      <td>
                        <a href="#" class="btn btn-primary btn-xs">Edit</a>
                        <form action="#" style="display: inline">
                          {{ csrf_field() }}
                          <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                      </td>
                    </tr>
                  @endforeach
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>
@endsection

@push('footer_scripts')
<script src="{{ asset('bower_components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js') }}"></script>
@endpush