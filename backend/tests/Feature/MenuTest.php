<?php

namespace Tests\Feature;

use App\Models\Menu;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MenuTest extends TestCase
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

        // Autentica o usuário no Sanctum
        Sanctum::actingAs($this->user, ['*']);
    }

     /**
     * Testa criação de menu com usuário autenticado.
     */
    public function test_create_menu_authenticated()
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

    /**
     * Testa listagem de menus autenticado.
     */
    public function test_list_menus_authenticated()
    {
        Menu::factory()->count(2)->create();

        $response = $this->getJson('/api/menu');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }

    /**
     * Testa exibir um menu.
     */
    public function test_show_menu_authenticated()
    {
        $menu = Menu::factory()->create([
            'name' => 'Settings',
            'slug' => 'settings',
        ]);

        $response = $this->getJson("/api/menu/{$menu->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Settings']);
    }

    /**
     * Testa atualização de menu autenticado.
     */
    public function test_update_menu_authenticated()
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

    /**
     * Testa exclusão autenticada.
     */
    public function test_delete_menu_authenticated()
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
