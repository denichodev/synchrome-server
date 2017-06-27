@extends('template')
@section('title', 'Calendars')
@section('description', 'Create/modify calendars')
@section('breadcrumb')
<li><a href="{{ route('dashboard') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
<li><a href="{{ route('calendars.index') }}"><i class="fa fa-calendar"></i> Calendars</a></li>
<li class="active"><a href="{{ route('calendars.create') }}"><i class="fa fa-plus"></i> Add New Calendar</a></li>
@endsection

@section('content')
<div class="row">
  <div class="col-md-9">
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">Add New Calendar</h3>
      </div>
      <div class="box-body">
        <div class="form-group">
          <input type="text" id="calendarName" class="form-control input-lg" placeholder="Calendar Name/Title">  
        </div>
        <div id="calendar"></div>
      </div>
      <!-- /.box-body -->
    </div>
  </div>
  <div class="col-md-3">
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">Publishing</h3>
      </div>
      <div class="box-body">
        <div class="form-group">
          <label for="status">Status</label>
          <select id="calendarStatus" class="form-control">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <button type="button" id="saveCalendar" class="btn btn-block btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- /.box -->
@include('calendars.modals.new-event')
@endsection

@push('head_scripts')
<link rel="stylesheet" href="{{ asset('bower_components/fullcalendar/dist/fullcalendar.min.css') }}">
<link rel="stylesheet" href="{{ asset('bower_components/AdminLTE/plugins/datepicker/datepicker3.css') }}">
<link rel="stylesheet" href="{{ asset('bower_components/sweetalert/dist/sweetalert.css') }}">
@endpush

@push('footer_scripts')
<script src="{{ asset('bower_components/moment/moment.js') }}"></script>
<script src="{{ asset('bower_components/fullcalendar/dist/fullcalendar.min.js') }}"></script>
<script src="{{ asset('bower_components/AdminLTE/plugins/datepicker/bootstrap-datepicker.js') }}"></script>
<script src="{{ asset('bower_components/sweetalert/dist/sweetalert.min.js') }}"></script>
@endpush