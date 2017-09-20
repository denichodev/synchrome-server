<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateRanksDropAllowancesColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ranks', function (Blueprint $table) {
            $table->dropColumn('allowance');
            $table->dropColumn('meal_allowance');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('allowances'. function (Blueprint $table) {
            $table->decimal('allowance', 15, 2);
            $table->decimal('meal_allowance', 15, 2);
        });
    }
}
