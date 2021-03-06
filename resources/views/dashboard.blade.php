<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{ env('APP_NAME') }}</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <meta content="{{ $jwt }}" name="jwt">
  <link rel="stylesheet" href="{{ asset('css/global.css') }}">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition skin-green sidebar-mini" data-spy="scroll" data-target="#scrollspy">
<div class="wrapper">
  <div id="root"></div>
</div>

<!-- ./wrapper -->
<script>
  window.__INITIAL_STATE__ = {
    appName: '{{ env('APP_NAME') }}',
    appAbbr: '{{ env('APP_ABBR') }}',
    userName: '{{ Auth::user()->name }}',
    userEmail: '{{ Auth::user()->email }}',
    csrfToken: '{{ csrf_token() }}'
  };
</script>
<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/fastclick.js') }}"></script>
<script src="{{ asset('js/jquery.slimscroll.min.js') }}"></script>
<script src="{{ asset('js/app.min.js') }}"></script>
<script src="{{ asset('js/index.js') }}"></script>
</body>
</html>
