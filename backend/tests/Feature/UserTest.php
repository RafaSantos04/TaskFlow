<?php

namespace Tests\Feature;

use App\Models\Profile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{

    use RefreshDatabase;


    public function test_create_user_successfully()
    {
        // Cria o profile "User" se necessário (o controller depende disso)
        $profile = Profile::factory()->create(['name' => 'User']);

        $payload = [
            'name' => 'Rafael Teste',
            'email' => 'rafael@example.com',
            'password' => '123456',
            'profile_id' => $profile->id,
        ];

        $response = $this->postJson('/api/user', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Usuário criado com sucesso',
                'user' => [
                    'name' => 'Rafael Teste',
                    'email' => 'rafael@example.com',
                ],
            ]);

        // Verifica se o usuário foi salvo no banco
        $this->assertDatabaseHas('users', [
            'email' => 'rafael@example.com',
        ]);
    }



    /**
     * Testa tentativa de criação de usuário com dados inválidos.
     */
    public function test_create_user_validation_error()
    {
        $response = $this->postJson('/api/user', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonStructure(['message', 'errors']);
    }

}
