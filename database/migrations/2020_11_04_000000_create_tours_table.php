
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateToursTable extends Migration
{
    public function up()
    {
        Schema::create('virtual_tours', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('content');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('virtual_tours');
    }
}
