<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 1. Remove primary key and old column
        Schema::table('users', function (Blueprint $table) {
            $table->dropPrimary('users_pkey'); // standard PostgreSQL primary key name
            $table->dropColumn('id');
        });

        // 2. Temporarily add UUID column as nullable
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('id')->nullable()->first();
        });

        // 3. Populate existing records with UUIDs
        DB::statement('UPDATE users SET id = gen_random_uuid()');

        // 4. Now make the field NOT NULL and PRIMARY KEY
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('id')->nullable(false)->change();
            $table->primary('id');
        });
    }

    public function down(): void
    {
        // Revert operation to autoincrement id
        Schema::table('users', function (Blueprint $table) {
            $table->dropPrimary('users_pkey');
            $table->dropColumn('id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->id()->first();
        });
    }
};
