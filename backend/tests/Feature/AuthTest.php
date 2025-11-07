<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function login_successfully()
    {
        $user = User::factory()->create([
            'email' => 'login@example.com',
            'password' => Hash::make('123456'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'login@example.com',
            'password' => '123456',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'access_token',
                'token_type',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'email_verified_at',
                    'created_at',
                    'updated_at',
                    'profile' => [
                        'id',
                        'name',
                    ],
                ],
            ]);
    }

    #[Test]
    public function login_fails_with_wrong_password()
    {
        $user = User::factory()->create([
            'email' => 'fail@example.com',
            'password' => Hash::make('123456'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'fail@example.com',
            'password' => 'senhaerrada',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Credenciais inválidas',
            ]);
    }

    #[Test]
    public function logout_successfully()
    {
        $user = User::factory()->create();

        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Logout realizado com sucesso',
            ]);
    }
}
