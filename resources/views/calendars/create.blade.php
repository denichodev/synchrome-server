@extends('template')
@section('title', 'Calendars')
@section('description', 'Create/modify calendars')
@section('breadcrumb')
<li><a href="{{ route('dashboard') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
<li><a href="{{ route('calendars.index') }}"><i class="fa fa-calendar"></i> Calendars</a></li>
<li class="active"><a href="{{ route('calendars.create') }}"><i class="fa fa-plus"></i> Add New Calendar</a></li>
@endsection

@section('content')
<div id="cal">
  <calendar></calendar>
</div>
@endsection

@push('footer_scripts')
<script src="{{ asset('js/calendar.js') }}"></script>
@endpush