@extends('template')
@section('title', 'Calendars')
@section('description', 'Create/modify calendars')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
<li class="breadcrumb-item active">Calendar</li>
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
                <a href="{{ route('calendars.create') }}" class="btn btn-primary"><i class="fa fa-plus"></i> &nbsp;Add New Calendar</a>
              </div>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Calendar Name</th>
                    <th>Date Range</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @if(count($calendars) == 0)
                    <tr>
                      <td colspan="3"><center>No calendar added yet</center></td>
                    </tr>
                  @else
                    @foreach($calendars as $cal)
                      <tr>
                        <td>{{ $cal->name }}</td>
                        <td>{{ date_create($cal->start_date)->format('j F Y') . ' to ' . date_create($cal->end_date)->format('j F Y') }}</td>
                        <td>
                          <a href="{{ route('calendars.edit', $cal->id) }}" class="btn btn-xs btn-primary">View/Edit</a>
                          <form action="{{ route('calendars.destroy', $cal->id) }}" method="POST" style="display: inline">
                              {{ csrf_field() }}  
                              <input type="hidden" name="_method" value="DELETE">
                              <button type="submit" class="btn btn-xs btn-danger">Delete</button>
                          </form>
                        </td>
                      </tr>
                    @endforeach
                  @endif
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              {{ count($calendars) }} calendar(s)
            </div>
            <!-- /.box-footer-->
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