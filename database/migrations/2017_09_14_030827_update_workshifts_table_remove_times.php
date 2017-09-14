<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMigrationUpdateWorkshiftsTableRemoveTimes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('workshifts', function (Blueprint $table) {
            $table->dropColumn('in');
            $table->dropColumn('out');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('workshifts', function (Blueprint $table) {
            $table->time('in');
            $table->time('out');
        });
    }
}
