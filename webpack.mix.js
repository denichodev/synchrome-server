const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix
  .sass('resources/assets/css/global.scss', 'public/css')
  .react('resources/assets/js/index.js', 'public/js')
  .copy('./node_modules/jquery/dist/jquery.min.js', 'public/js')
  .copy('./node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/js')
  .copy('./node_modules/fastclick/lib/fastclick.js', 'public/js')
  .copy('./node_modules/admin-lte/dist/js/app.min.js', 'public/js')
  .copy('./node_modules/admin-lte/dist/img/user2-160x160.jpg', 'public/images/vendor/admin-lte/dist');
