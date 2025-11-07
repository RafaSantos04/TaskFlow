<?php

namespace Tests\Feature;

use App\Models\Profile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserTest extends TestCase
{

    use RefreshDatabase;

    #[Test]
    public function user_successfully()
    {
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

        $this->assertDatabaseHas('users', [
            'email' => 'rafael@example.com',
        ]);
    }



    #[Test]
    public function create_user_validation_error()
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
