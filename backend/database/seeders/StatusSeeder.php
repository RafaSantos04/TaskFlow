<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('status')->insert([
            [
                'id' => Str::uuid(),
                'name' => 'A Fazer',
                'color' => '#9e9e9e',
                'description' => 'Tarefa cadastrada, mas ainda não iniciada.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Fazendo',
                'color' => '#2196f3',
                'description' => 'Tarefa atualmente em andamento.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Concluído',
                'color' => '#4caf50', 
                'description' => 'Tarefa finalizada com sucesso.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
