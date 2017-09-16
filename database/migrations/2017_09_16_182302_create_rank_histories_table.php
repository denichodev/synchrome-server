<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRankHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rank_histories', function (Blueprint $table) {
            $table->string('employee_id');
            $table->foreign('employee_id')
                ->references('id')->on('employees');
            $table->string('rank_id', 2);
            $table->foreign('rank_id')
                ->references('id')->on('ranks');
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
        Schema::dropIfExists('rank_histories');
    }
}
