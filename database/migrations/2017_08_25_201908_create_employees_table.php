<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->string('id');
            $table->primary('id');
            $table->string('name');
            $table->string('agency_id');
            $table->foreign('agency_id')
                ->references('id')->on('agencies');
            $table->string('echelon_id')->nullable();
            $table->foreign('echelon_id')
                ->references('id')->on('echelons');
            $table->unsignedInteger('calendar_id');
            $table->foreign('calendar_id')
                ->references('id')->on('calendars');
            $table->enum('gender', ['m', 'f']);
            $table->boolean('married');
            $table->text('address');
            $table->string('phone', 12);
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
        Schema::dropIfExists('employees');
    }
}
