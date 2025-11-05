<?php

namespace Database\Factories;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class MenuFactory extends Factory
{
    protected $model = Menu::class;

    public function definition(): array
    {
        $name = ucfirst($this->faker->unique()->word());

        return [
            'id' => (string) Str::uuid(),
            'name' => $name,
            'slug' => Str::slug($name),
            'icon' => $this->faker->randomElement(['home', 'settings', 'user', 'chart']),
            'url' => '/' . Str::slug($name),
            'order' => $this->faker->numberBetween(1, 10),
            'is_active' => $this->faker->boolean(),
        ];
    }
}
