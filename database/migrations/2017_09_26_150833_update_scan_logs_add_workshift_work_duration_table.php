<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateScanLogsAddWorkshiftWorkDurationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('scan_logs', function (Blueprint $table) {
            $table->unsignedInteger('workshift_work_duration');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('scan_logs', function (Blueprint $table) {
            $table->dropColumn('workshift_work_duration');
        });
    }
}
