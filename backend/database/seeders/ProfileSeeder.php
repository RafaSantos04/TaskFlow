<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('profile')->insert([
            [
                'id' => Str::uuid(),
                'name' => 'Admin',
                'description' => 'Administrator profile with full access',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'User',
                'description' => 'Standard user profile',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
