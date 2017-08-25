@extends('template')
@section('title', 'Add New Employee')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
<li class="breadcrumb-item"><a href="{{ route('employees.index') }}">Employees</a></li>
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
              @if(count($errors) > 0)
                @foreach($errors->all() as $error)  
                  <div class="alert alert-warning">{{ $error }}</div>
                @endforeach
              @endif
              <form action="{{ route('employees.store') }}" method="POST">
                {{ csrf_field() }}
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="id">NIP</label>
                      <input type="text" name="id" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="agency_id">Agency</label>
                      <select name="agency_id" id="agency" class="form-control">
                        @foreach($agencies as $agency)
                          <option value="{{ $agency->id }}">{{ $agency->name }}</option>
                        @endforeach
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="echelon_id">Echelon</label>
                      <select name="echelon_id" id="echelon" class="form-control" disabled>

                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" name="name" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>
@endsection

@push('head_scripts')
<link rel="stylesheet" href="{{ asset('bower_components/select2/dist/css/select2.min.css') }}">
@endpush

@push('footer_scripts')
<script src="{{ asset('bower_components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js') }}"></script>
<script src="{{ asset('bower_components/select2/dist/js/select2.min.js') }}"></script>
<script>
var jwt = '{{ $jwt }}';

$(function () {
  $('#agency').select2();
  $('#echelon').select2();
  $('#echelon').attr('disabled', 'disabled');
});

$(document).on('change', '#agency', function () {
  $.ajax({
    type: 'GET',
    url: '/api/agency/' + $('#agency').val() + '/echelons',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
    },
    success: function (res) {
      if (res.result == 'success') {
        $('#echelon').empty();
        $.each(res.data, function (i, value) {
          $('#echelon').append('<option value="' + value.id + '">' + value.name + '</option>');
        });
        $('#echelon').removeAttr('disabled');
      } else {
        alert('Failed to fetch echelons');
      }
    }
  });
});
</script>
@endpush