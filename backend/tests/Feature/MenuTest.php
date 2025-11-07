<?php

namespace Tests\Feature;

use App\Models\Menu;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MenuTest extends TestCase
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
    public function create_menu_authenticated()
    {
        $payload = [
            'name' => 'Dashboard',
            'icon' => 'home',
            'url' => '/dashboard',
            'order' => 1,
            'is_active' => true,
        ];

        $response = $this->postJson('/api/menu', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'name' => 'Dashboard',
                'slug' => 'dashboard',
                'url' => '/dashboard',
                'is_active' => true,
            ]);

        $this->assertDatabaseHas('menu', [
            'name' => 'Dashboard',
            'slug' => 'dashboard',
        ]);
    }

    #[Test]
    public function list_menus_authenticated()
    {
        Menu::factory()->count(2)->create();

        $response = $this->getJson('/api/menu');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }

    #[Test]
    public function show_menu_authenticated()
    {
        $menu = Menu::factory()->create([
            'name' => 'Settings',
            'slug' => 'settings',
        ]);

        $response = $this->getJson("/api/menu/{$menu->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Settings']);
    }

    #[Test]
    public function update_menu_authenticated()
    {
        $menu = Menu::factory()->create([
            'name' => 'Dashboard',
            'slug' => 'dashboard',
        ]);

        $updateData = [
            'name' => 'Main Panel',
            'icon' => 'panel',
            'url' => '/panel',
            'order' => 2,
            'is_active' => false,
        ];

        $response = $this->putJson("/api/menu/{$menu->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => 'Main Panel',
                'slug' => 'main-panel',
                'url' => '/panel',
                'is_active' => false,
            ]);

        $this->assertDatabaseHas('menu', [
            'name' => 'Main Panel',
            'slug' => 'main-panel',
        ]);
    }

    #[Test]
    public function delete_menu_authenticated()
    {
        $menu = Menu::factory()->create();

        $response = $this->deleteJson("/api/menu/{$menu->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Menu successfully deleted.',
            ]);

        $this->assertDatabaseMissing('menu', ['id' => $menu->id]);
    }


}
