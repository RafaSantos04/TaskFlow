<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // UUID support
        DB::statement('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        Schema::create('task', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('task'); 
            $table->uuid('status_id'); 
            $table->date('start_date')->nullable();
            $table->date('final_date')->nullable();
            $table->uuid('user_id')->nullable(); 
            $table->text('comments')->nullable();
            $table->timestamps();

            // FK
            $table->foreign('status_id')->references('id')->on('status')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarefas');
    }
};
