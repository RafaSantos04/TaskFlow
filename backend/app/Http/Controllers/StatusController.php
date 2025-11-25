<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Status",
 *     description="Manage task statuses within the system"
 * )
 */
class StatusController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/status",
     *     tags={"Status"},
     *     summary="Get all statuses",
     *     description="Returns a list of all registered statuses.",
     *     @OA\Response(
     *         response=200,
     *         description="List retrieved successfully",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Status"))
     *     )
     * )
     */
    public function index()
    {
        $status = Status::with('relationshipTask')
            ->withCount('relationshipTask')
            ->get();
        return response()->json($status, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/status",
     *     tags={"Status"},
     *     summary="Create a new status",
     *     description="Creates a new status based on the provided data.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "color"},
     *             @OA\Property(property="name", type="string", example="In Progress"),
     *             @OA\Property(property="color", type="string", example="#FFA500"),
     *             @OA\Property(property="description", type="string", example="Tasks currently being worked on")
     * 
     *         )
     *     ),
     *     @OA\Response(response=201, description="Status created successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * 
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'color' => 'required|string',
            'description' => 'nullable|string|max:255',
        ]);

        $nextOrder = Status::max('order') + 1;

        $status = Status::create([
            ...$validated,
            'order' => $nextOrder,
        ]);

        return response()->json($status, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/status/{id}",
     *     tags={"Status"},
     *     summary="Get a specific status",
     *     description="Returns the details of a specific status by its UUID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="UUID of the status",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(response=200, description="Status retrieved successfully", @OA\JsonContent(ref="#/components/schemas/Status")),
     *     @OA\Response(response=404, description="Status not found")
     * )
     */
    public function show($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status não encontrado.'], 404);
        }

        return response()->json($status, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/status/{id}",
     *     tags={"Status"},
     *     summary="Update an existing status",
     *     description="Updates the information of an existing status by its UUID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="UUID of the status",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Completed"),
     *             @OA\Property(property="color", type="string", example="#00FF00"),
     *             @OA\Property(property="description", type="string", example="Tasks that have been completed")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Status updated successfully"),
     *     @OA\Response(response=404, description="Status not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status não encontrado.'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'color' => 'sometimes|string|max:7',
            'description' => 'nullable|string|max:255',
        ]);

        $status->update($validated);

        return response()->json($status, 200);
    }

    public function updateOrder(Request $request, $id)
    {
        $request->validate([
            'order' => 'required|integer|min:1'
        ]);

        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status não encontrado.'], 404);
        }

        $newOrder = $request->order;
        $oldOrder = $status->order;

        $target = Status::where('order', $newOrder)->first();

        if ($target) {
            $target->order = $oldOrder;
            $target->save();
        }

        $status->order = $newOrder;
        $status->save();

        return response()->json([
            'message' => 'Ordem atualizada com sucesso.',
            'status' => $status
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/status/{id}",
     *     tags={"Status"},
     *     summary="Delete a status",
     *     description="Removes a status from the system by its UUID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="UUID of the status",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(response=204, description="Status deleted successfully"),
     *     @OA\Response(response=404, description="Status not found")
     * )
     */
    public function destroy($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status não encontrado.'], 404);
        }

        $status->delete();

        return response()->json(null, 204);
    }
}
