<!--
 * CoreUI - Open Source Bootstrap Admin Template
 * @version v1.0.0-alpha.6
 * @link http://coreui.io
 * Copyright (c) 2017 creativeLabs Łukasz Holeczek
 * @license MIT
 -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>{{ env('APP_NAME') }} | @yield('title')</title>

  <!-- Icons -->
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css" rel="stylesheet">
  <!-- Main styles for this application -->
  <link href="{{ asset('css/global.css') }}" rel="stylesheet">
  @stack('head_scripts')
</head>

<body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button">☰</button>
    <a href="#"></a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item"><a class="nav-link navbar-toggler sidebar-toggler" href="#">☰</a></li>
    </ul>
  </header>

  <div class="app-body">
    <div class="sidebar">
      <nav class="sidebar-nav">
        <ul class="nav">
          <li class="nav-item">
              <a class="nav-link" href="{{ route('dashboard') }}"><i class="fa fa-dashboard"></i> Dashboard </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="{{ route('calendars.index') }}"><i class="fa fa-calendar"></i> Calendars </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="{{ route('clusters.index') }}"><i class="fa fa-cloud"></i> Clusters </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main content -->
    <main class="main">
      <ol class="breadcrumb">
        @yield('breadcrumb')
      </ol>

      <div class="container-fluid">
        @yield('content')
      </div>
      <!-- /.container-fluid -->
    </main>
  </div>

  <footer class="app-footer">
    <a href="http://coreui.io">CoreUI</a> © 2017 creativeLabs.
    <span class="float-right">Powered by <a href="http://coreui.io">CoreUI</a>
    </span>
  </footer>

  <!-- Bootstrap and necessary plugins -->
  <script src="{{ asset('bower_components/jquery/dist/jquery.min.js') }}"></script>
  <script src="{{ asset('bower_components/tether/dist/js/tether.min.js') }}"></script>
  <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
  <script src="{{ asset('bower_components/pace/pace.min.js') }}"></script>
  <!-- GenesisUI main scripts -->
  <script src="{{ asset('js/coreui.js') }}"></script>
  <!-- Plugins and scripts required by this views -->
  @stack('footer_scripts')
</body>
</html>