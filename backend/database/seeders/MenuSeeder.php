<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('menu')->insert([
            [
                'id' => Str::uuid(),
                'name' => 'Home',
                'slug' => 'home',
                'icon' => 'home',
                'url' => '/home',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
                [
                'id' => Str::uuid(),
                'name' => 'Tarefas',
                'slug' => 'task',
                'icon' => 'task',
                'url' => '/task',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
