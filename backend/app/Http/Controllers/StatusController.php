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
     *     description="Returns a list of all active statuses (soft deletes hidden).",
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
            ->get(); // Soft deletes ocultam automaticamente

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
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="color", type="string"),
     *             @OA\Property(property="description", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Status created successfully"),
     *     @OA\Response(response=400, description="Validation error")
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
     *     @OA\Parameter(name="id", in="path", required=true),
     *     @OA\Response(response=200, description="Status retrieved successfully"),
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
     *     @OA\Parameter(name="id", in="path", required=true),
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
            $target->update(['order' => $oldOrder]);
        }

        $status->update(['order' => $newOrder]);

        return response()->json([
            'message' => 'Ordem atualizada com sucesso.',
            'status' => $status,
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/status/{id}",
     *     tags={"Status"},
     *     summary="Soft delete a status",
     *     description="Marks a status as deleted without removing it from the database.",
     *     @OA\Parameter(name="id", in="path", required=true),
     *     @OA\Response(response=204, description="Status soft-deleted successfully"),
     *     @OA\Response(response=404, description="Status not found")
     * )
     */
    public function destroy($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status não encontrado.'], 404);
        }

        $status->delete(); // agora soft delete

        return response()->json(null, 204);
    }

    /**
     *  Restore a soft-deleted status
     */
    public function restore($id)
    {
        $status = Status::onlyTrashed()->find($id);

        if (!$status) {
            return response()->json(['message' => 'Status não encontrado ou não está deletado.'], 404);
        }

        $status->restore();

        return response()->json(['message' => 'Status restaurado com sucesso.'], 200);
    }

    /**
     * Force delete (exclusão permanente)
     */
    public function forceDelete($id)
    {
        $status = Status::onlyTrashed()->find($id);

        if (!$status) {
            return response()->json(['message' => 'Status não encontrado.'], 404);
        }

        $status->forceDelete();

        return response()->json(['message' => 'Status removido permanentemente.'], 200);
    }
}
