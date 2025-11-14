<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MenuProfileSeeder extends Seeder
{
    public function run(): void
    {
        $menus = DB::table('menu')->get();
        $profiles = DB::table('profile')->get();

        foreach ($profiles as $profile) {
            foreach ($menus as $menu) {
                DB::table('menu_profile')->insert([
                    'id' => Str::uuid(),
                    'menu_id' => $menu->id,
                    'profile_id' => $profile->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
