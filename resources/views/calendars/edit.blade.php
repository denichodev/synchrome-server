@extends('template')
@section('title', 'Calendars')
@section('description', 'Edit Calendar: ' . $calendar->name)
@section('breadcrumb')
<li><a href="{{ route('dashboard') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
<li><a href="{{ route('calendars.index') }}"><i class="fa fa-calendar"></i> Calendars</a></li>
<li class="active"><a href="{{ route('calendars.edit', $calendar->id) }}"><i class="fa fa-edit"></i> Edit Calendar: {{ $calendar->name }}</a></li>
@endsection

@section('content')
<div id="cal">
</div>
@endsection

@push('head_scripts')
<meta name="jwt-token" content="{{ $token }}">
@endpush

@push('footer_scripts')
<script src="{{ asset('js/index.js') }}"></script>
@endpush