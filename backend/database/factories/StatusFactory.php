<?php

namespace Database\Factories;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StatusFactory extends Factory
{
    protected $model = Status::class;

    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'name' => $this->faker->randomElement(['Pendente', 'Em andamento', 'Concluído']),
            'color' => $this->faker->safeHexColor(),
            'description' => $this->faker->sentence(6),
        ];
    }
}
