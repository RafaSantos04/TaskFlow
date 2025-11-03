<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * @OA\Tag(
 *     name="Menu",
 *     description="Endpoints for managing system menus"
 * )
 */
class MenuController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/menus",
     *     summary="Get all menus",
     *     tags={"Menu"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all menus",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Menu"))
     *     )
     * )
     */
    public function index()
    {
        $menu = Menu::all();
        return response()->json($menu);
    }

    /**
     * @OA\Post(
     *     path="/api/menus",
     *     summary="Create a new menu",
     *     tags={"Menu"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Dashboard"),
     *             @OA\Property(property="icon", type="string", example="home"),
     *             @OA\Property(property="url", type="string", example="/dashboard"),
     *             @OA\Property(property="order", type="integer", example=1),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Menu successfully created",
     *         @OA\JsonContent(ref="#/components/schemas/Menu")
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'url' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $menu = Menu::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'icon' => $request->icon,
            'url' => $request->url,
            'order' => $request->order ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json($menu, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/menus/{id}",
     *     summary="Get a specific menu by ID",
     *     tags={"Menu"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Menu ID (UUID)", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Menu found", @OA\JsonContent(ref="#/components/schemas/Menu")),
     *     @OA\Response(response=404, description="Menu not found")
     * )
     */
    public function show($id)
    {
        $menu = Menu::findOrFail($id);
        return response()->json($menu);
    }

    /**
     * @OA\Put(
     *     path="/api/menus/{id}",
     *     summary="Update an existing menu",
     *     tags={"Menu"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Menu ID (UUID)", @OA\Schema(type="string")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Updated Dashboard"),
     *             @OA\Property(property="icon", type="string", example="dashboard-outline"),
     *             @OA\Property(property="url", type="string", example="/dashboard"),
     *             @OA\Property(property="order", type="integer", example=2),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Menu successfully updated", @OA\JsonContent(ref="#/components/schemas/Menu")),
     *     @OA\Response(response=404, description="Menu not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'url' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $menu->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'icon' => $request->icon,
            'url' => $request->url,
            'order' => $request->order,
            'is_active' => $request->is_active,
        ]);

        return response()->json($menu);
    }

    /**
     * @OA\Delete(
     *     path="/api/menus/{id}",
     *     summary="Delete a menu",
     *     tags={"Menu"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Menu ID (UUID)", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Menu successfully deleted"),
     *     @OA\Response(response=404, description="Menu not found")
     * )
     */
    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json(['message' => 'Menu successfully deleted.']);
    }
}

/**
 * @OA\Schema(
 *     schema="Menu",
 *     type="object",
 *     title="Menu",
 *     description="Menu entity schema",
 *     @OA\Property(property="id", type="string", format="uuid", example="9da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
 *     @OA\Property(property="name", type="string", example="Dashboard"),
 *     @OA\Property(property="slug", type="string", example="dashboard"),
 *     @OA\Property(property="icon", type="string", example="home"),
 *     @OA\Property(property="url", type="string", example="/dashboard"),
 *     @OA\Property(property="order", type="integer", example=1),
 *     @OA\Property(property="is_active", type="boolean", example=true),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-03T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-11-03T12:00:00Z")
 * )
 */
