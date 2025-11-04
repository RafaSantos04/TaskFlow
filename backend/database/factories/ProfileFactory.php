<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class ProfileFactory extends Factory
{

    protected $model = \App\Models\Profile::class;

    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'name' => 'User',
            'description' => 'Standard user profile',
        ];
    }

}