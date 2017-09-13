<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScanLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scan_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('date');
            $table->string('employee_id');
            $table->foreign('employee_id')
                ->references('id')->on('employees');
            $table->time('workshift_in');
            $table->time('workshift_out');
            $table->time('checkin_at');
            $table->time('checkout_at');
            $table->string('absence_type_id', 2)->nullable();
            $table->foreign('absence_type_id')
                ->references('id')->on('absence_types');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scan_logs');
    }
}
