<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'task' => $this->faker->sentence(4), // algo mais descritivo para o nome da tarefa
            'status_id' => Status::factory(),    // cria um status válido
            'start_date' => now(),
            'final_date' => now()->addDays($this->faker->numberBetween(3, 14)),
            'user_id' => User::factory(),        // cria um usuário válido
            'comments' => $this->faker->paragraph(),
        ];
    }
}
