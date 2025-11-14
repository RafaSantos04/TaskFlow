<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Profile",
 *     description="Manage user profile and permission levels within the system"
 * )
 */
class ProfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/profile",
     *     tags={"Profile"},
     *     summary="Get all profile",
     *     description="Returns a list of all registered profile.",
     *     @OA\Response(
     *         response=200,
     *         description="List retrieved successfully",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Profile"))
     *     )
     * )
     */
    public function index()
    {
        $profiles = Profile::all();
        return response()->json($profiles, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/profile",
     *     tags={"Profile"},
     *     summary="Create a new profile",
     *     description="Creates a new profile for users with permission levels.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Administrator"),
     *             @OA\Property(property="description", type="string", example="Full access to system features")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Profile created successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:profile,name',
            'description' => 'nullable|string|max:25',
        ]);

        $profile = Profile::create($validated);

        return response()->json($profile, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/profile/{id}",
     *     tags={"Profile"},
     *     summary="Get a specific profile",
     *     description="Returns the details of a specific profile by its UUID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="UUID of the profile",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(response=200, description="Profile retrieved successfully", @OA\JsonContent(ref="#/components/schemas/Profile")),
     *     @OA\Response(response=404, description="Profile not found")
     * )
     */
    public function show($id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Perfil não encontrado.'], 404);
        }

        return response()->json($profile, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/profile/{id}",
     *     tags={"Profile"},
     *     summary="Update an existing profile",
     *     description="Updates the information of an existing profile by its UUID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="UUID of the profile",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Manager"),
     *             @OA\Property(property="description", type="string", example="Can manage projects and tasks")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Profile updated successfully"),
     *     @OA\Response(response=404, description="Profile not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Perfil não encontrado.'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100|unique:profile,name,' . $id,
            'description' => 'nullable|string|max:25',
        ]);

        $profile->update($validated);

        return response()->json($profile, 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/profile/{id}",
     *     tags={"Profile"},
     *     summary="Delete a profile",
     *     description="Removes a profile from the system by its UUID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="UUID of the profile",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(response=204, description="Profile deleted successfully"),
     *     @OA\Response(response=404, description="Profile not found")
     * )
     */
    public function destroy($id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Perfil não encontrado.'], 404);
        }

        $profile->delete();

        return response()->json(null, 204);
    }
}
