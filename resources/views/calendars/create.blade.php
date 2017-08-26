@extends('template')
@section('title', 'Calendars')
@section('description', 'Create/modify calendars')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
<li class="breadcrumb-item"><a href="{{ route('calendars.index') }}">Calendar</a></li>
<li class="breadcrumb-item active">Add New Calendar</li>
@endsection

@section('content')
<div id="root">
</div>
@endsection

@push('head_scripts')
<meta name="jwt-token" content="{{ $token }}">
@endpush

@push('footer_scripts')
<script src="{{ asset('js/index.js') }}"></script>
@endpush