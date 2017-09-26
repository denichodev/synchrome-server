<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateScanLogsTableDropTimeByCoumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('scan_logs', function (Blueprint $table) {
            $table->dropColumn('early_by');
            $table->dropColumn('late_by');
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
            $table->unsignedInteger('early_by')->nullable();
            $table->unsignedInteger('late_by')->nullable();
        });
    }
}
