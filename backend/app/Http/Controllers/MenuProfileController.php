<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Profile;

/**
 * @OA\Tag(
 *     name="MenuProfile",
 *     description="Manage relationships between Menus and Profiles"
 * )
 */
class MenuProfileController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/menu-profile/attach",
     *     tags={"MenuProfile"},
     *     summary="Attach a Menu to a Profile",
     *     description="Associates a specific menu item to a profile using their UUIDs.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"profile_id", "menu_id"},
     *             @OA\Property(property="profile_id", type="string", format="uuid", example="4da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
     *             @OA\Property(property="menu_id", type="string", format="uuid", example="9da9934b-cede-4f05-ba1c-38ab1f55ccf9")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Menu successfully attached to the profile."
     *     ),
     *     @OA\Response(response=422, description="Validation error.")
     * )
     */
    public function attachMenuToProfile(Request $request)
    {
        $request->validate([
            'profile_id' => 'required|exists:profile,id',
            'menu_id' => 'required|exists:menu,id',
        ]);

        $profile = Profile::findOrFail($request->profile_id);
        $profile->menu()->attach($request->menu_id);

        return response()->json(['message' => 'Menu successfully attached to the profile.']);
    }

    /**
     * @OA\Post(
     *     path="/api/menu-profile/detach",
     *     tags={"MenuProfile"},
     *     summary="Detach a Menu from a Profile",
     *     description="Removes the association between a menu and a profile.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"profile_id", "menu_id"},
     *             @OA\Property(property="profile_id", type="string", format="uuid", example="4da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
     *             @OA\Property(property="menu_id", type="string", format="uuid", example="9da9934b-cede-4f05-ba1c-38ab1f55ccf9")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Menu successfully detached from the profile."
     *     ),
     *     @OA\Response(response=422, description="Validation error.")
     * )
     */
    public function detachMenuFromProfile(Request $request)
    {
        $request->validate([
            'profile_id' => 'required|exists:profile,id',
            'menu_id' => 'required|exists:menu,id',
        ]);

        $profile = Profile::findOrFail($request->profile_id);
        $profile->menu()->detach($request->menu_id);

        return response()->json(['message' => 'Menu successfully detached from the profile.']);
    }

    /**
     * @OA\Get(
     *     path="/api/menu-profile/{profile_id}",
     *     tags={"MenuProfile"},
     *     summary="Get Menus by Profile",
     *     description="Retrieves all menus associated with a specific profile.",
     *     @OA\Parameter(
     *         name="profile_id",
     *         in="path",
     *         description="UUID of the profile",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of menus retrieved successfully.",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Menu"))
     *     ),
     *     @OA\Response(response=404, description="Profile not found.")
     * )
     */
    public function getMenuByProfile($profile_id)
    {
        $profile = Profile::with('menu')->findOrFail($profile_id);
        return response()->json($profile->menu);
    }
}

