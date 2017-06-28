@extends('template')
@section('title', 'Dashboard')
@section('breadcrumb')
<li><a href="{{ route('dashboard') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
@endsection

@section('content')
<!-- Default box -->
<div class="box">
  <div class="box-header with-border">
    <h3 class="box-title">@yield('title')</h3>
  </div>
  <div class="box-body">
    Start creating your amazing application!
  </div>
  <!-- /.box-body -->
  <div class="box-footer">
    Footer
  </div>
  <!-- /.box-footer-->
</div>
<!-- /.box -->
@endsection

@push('footer_scripts')
<script src="{{ asset('bower_components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js') }}"></script>
@endpush