<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use App\Models\Status;
use App\Models\Profile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class TaskTest extends TestCase
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
    public function create_task()
    {
        $status = Status::factory()->create();

        $payload = [
            'task' => 'Tarefa de teste',
            'status_id' => $status->id,
            'start_date' => now()->toDateString(),
            'final_date' => now()->addDays(5)->toDateString(),
            'user_id' => $this->user->id,
            'comments' => 'Comentário inicial da tarefa',
        ];

        $response = $this->postJson('/api/task', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'task' => 'Tarefa de teste',
                'comments' => 'Comentário inicial da tarefa',
            ]);

        $this->assertDatabaseHas('task', ['task' => 'Tarefa de teste']);
    }

    #[Test]
    public function list_tasks()
    {
        Task::factory()->count(3)->create();

        $response = $this->getJson('/api/task');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => ['id', 'task', 'status_id', 'start_date', 'final_date', 'user_id', 'comments']
                ]
            ]);
    }

    #[Test]
    public function show_a_single_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);

        $response = $this->getJson("/api/task/{$task->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $task->id,
                'task' => $task->task,
            ]);
    }

    #[Test]
    public function update_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        $status = Status::factory()->create();

        $updateData = [
            'task' => 'Tarefa Atualizada',
            'comments' => 'Comentários atualizados',
            'status_id' => $status->id,
            'user_id' => $this->user->id,
        ];

        $response = $this->putJson("/api/task/{$task->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('task', ['task' => 'Tarefa Atualizada']);
    }


    #[Test]
    public function delete_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);

        $response = $this->deleteJson("/api/task/{$task->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Tarefa deletada com sucesso.'
            ]);

        $this->assertDatabaseMissing('task', ['id' => $task->id]);
    }
}
