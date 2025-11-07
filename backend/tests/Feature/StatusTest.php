<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class StatusTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $profile = Profile::factory()->create(['name' => 'Admin']);

        $this->user = User::factory()->create([
            'profile_id' => $profile->id,
        ]);

        Sanctum::actingAs($this->user, ['*']);
    }

    #[Test]
    public function it_can_create_a_status()
    {
        $payload = [
            'name' => 'In Progress',
            'color' => '#FFA500',
            'description' => 'Tasks currently being worked on',
        ];

        $response = $this->postJson('/api/status', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'In Progress']);

        $this->assertDatabaseHas('status', ['name' => 'In Progress']);
    }

    #[Test]
    public function it_can_list_all_statuses()
    {
        Status::factory()->count(3)->create();

        $response = $this->getJson('/api/status');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    #[Test]
    public function it_can_show_a_specific_status()
    {
        $status = Status::factory()->create();

        $response = $this->getJson("/api/status/{$status->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $status->id]);
    }

    #[Test]
    public function it_can_update_a_status()
    {
        $status = Status::factory()->create([
            'name' => 'Pending',
            'color' => '#CCCCCC',
        ]);

        $response = $this->putJson("/api/status/{$status->id}", [
            'name' => 'Completed',
            'color' => '#00FF00',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Completed']);

        $this->assertDatabaseHas('status', ['name' => 'Completed']);
    }

    #[Test]
    public function it_can_delete_a_status()
    {
        $status = Status::factory()->create();

        $response = $this->deleteJson("/api/status/{$status->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('status', ['id' => $status->id]);
    }
}
