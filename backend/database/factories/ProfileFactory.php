<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    public function definition(): array
    {
        $name = ucfirst($this->faker->unique()->word());

        return [
            'id' => (string) Str::uuid(),
            'name' => $name,
            'description' => "{$name} profile",
        ];
    }
}
