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
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Fazendo',
                'color' => '#2196f3',
                'description' => 'Tarefa atualmente em andamento.',
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Concluído',
                'color' => '#4caf50', 
                'description' => 'Tarefa finalizada com sucesso.',
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
