<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Cria um perfil e um usuário autenticado
        $profile = Profile::factory()->create(['name' => 'Admin']);

        $this->user = User::factory()->create([
            'profile_id' => $profile->id,
        ]);

        // Autentica o usuário com Sanctum
        Sanctum::actingAs($this->user, ['*']);
    }

    #[Test]
    public function create_profile()
    {
        $payload = [
            'name' => 'Test Profile',
            'description' => 'Profile for testing',
        ];

        $response = $this->postJson('/api/profile', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'name' => 'Test Profile',
                'description' => 'Profile for testing',
            ]);

        $this->assertDatabaseHas('profile', $payload);
    }

    #[Test]
    public function list_profiles()
    {
        Profile::factory()->count(3)->create();

        $response = $this->getJson('/api/profile');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['id', 'name', 'description', 'created_at', 'updated_at']
            ]);
    }

    #[Test]
    public function show_a_single_profile()
    {
        $profile = Profile::factory()->create();

        $response = $this->getJson("/api/profile/{$profile->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $profile->id,
                'name' => $profile->name,
            ]);
    }

    #[Test]
    public function update_profile()
    {
        $profile = Profile::factory()->create();

        $updateData = [
            'name' => 'Updated Name',
            'description' => 'Updated Description',
        ];

        $response = $this->putJson("/api/profile/{$profile->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('profile', $updateData);
    }

    #[Test]
    public function delete_profile()
    {
        $profile = Profile::factory()->create();

        $response = $this->deleteJson("/api/profile/{$profile->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('profile', ['id' => $profile->id]);
    }
}
