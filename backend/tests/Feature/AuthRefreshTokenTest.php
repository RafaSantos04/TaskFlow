<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthRefreshTokenTest extends TestCase
{
    use RefreshDatabase;

    // public function test_user_can_refresh_token_successfully()
    // {
    //     $user = User::factory()->create([
    //         'email' => 'refresh@example.com',
    //         'password' => Hash::make('123456'),
    //     ]);

    //     $loginResponse = $this->postJson('/api/login', [
    //         'email' => 'refresh@example.com',
    //         'password' => '123456',
    //     ]);

    //     $loginResponse->assertStatus(200)
    //         ->assertJsonStructure([
    //             'message',
    //             'access_token',
    //             'token_type',
    //             'user' => [
    //                 'id',
    //                 'name',
    //                 'email',
    //                 'email_verified_at',
    //                 'created_at',
    //                 'updated_at',
    //                 'profile' => [
    //                     'id',
    //                     'name',
    //                 ],
    //             ],
    //         ]);

    //     $oldToken = $loginResponse->json('access_token');

    //     // Faz a requisição para /refresh-token com o token antigo
    //     $response = $this->withHeader('Authorization', "Bearer $oldToken")
    //         ->postJson('/api/refresh-token');

    //     $response->assertStatus(200)
    //         ->assertJsonStructure([
    //             'message',
    //             'access_token',
    //             'token_type',
    //             'expires_at',
    //         ])
    //         ->assertJson([
    //             'message' => 'Token renovado com sucesso',
    //             'token_type' => 'Bearer',
    //         ]);

    //     // Novo token deve ser diferente do anterior
    //     $newToken = $response->json('access_token');
    //     $this->assertNotEquals($oldToken, $newToken);
    // }

    public function test_refresh_token_fails_without_authentication()
    {
        $response = $this->postJson('/api/refresh-token');

        $response->assertStatus(401);
    }
}
