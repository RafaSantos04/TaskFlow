<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Buscar perfis criados pelo ProfileSeeder
        $adminProfile = DB::table('profile')->where('name', 'Admin')->first();
        $userProfile = DB::table('profile')->where('name', 'User')->first();

        // Criar usuário Admin
        User::create([
            'id' => Str::uuid(),
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => '123456',
            'profile_id' => $adminProfile->id,
        ]);

        // Criar usuário padrão
        User::create([
            'id' => Str::uuid(),
            'name' => 'Usuário Padrão',
            'email' => 'user@gmail.com',
            'password' => '123456',
            'profile_id' => $userProfile->id,
        ]);
    }
}
