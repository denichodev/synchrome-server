## synchrome-server

Server-side app to manage calendars, employees attendance, clusters for Synchrome project.

## Installation

1. Clone this repo.
2. Copy `.env.example` to new file named `.env`. Set all required configurations on that file.
3. Open `./database/seeds/UsersTableSeeder`. Set initial administrator user on that file.
3. Run `composer install`.
4. Run `php artisan migrate`.
5. Run `php artisan db:seed --class=UsersTableSeeder`.
6. Run `npm install`.
7. Run `bower install`.
8. Run `npm run dev`.
9. Run `php artisan serve` and rocks up.
