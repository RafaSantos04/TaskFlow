<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

/**
 * @OA\Tag(
 *     name="Tasks",
 *     description="Endpoints for managing tasks"
 * )
 */
class TaskController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="List all tasks",
     *     @OA\Response(
     *         response=200,
     *         description="Tasks retrieved successfully"
     *     )
     * )
     */
    public function index()
    {
        $tasks = Task::all();

        return response()->json([
            'success' => true,
            'message' => 'Tasks retrieved successfully.',
            'data' => $tasks,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="Create a new task",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"task", "status_id", "responsavel"},
     *             @OA\Property(property="task", type="string", example="Implement login system"),
     *             @OA\Property(property="status_id", type="string", example="uuid-of-status"),
     *             @OA\Property(property="data_inicio", type="string", format="date", example="2025-10-31"),
     *             @OA\Property(property="data_final", type="string", format="date", example="2025-11-05"),
     *             @OA\Property(property="responsavel", type="string", example="uuid-of-user"),
     *             @OA\Property(property="comentarios", type="string", example="High priority task")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Task created successfully"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task' => 'required|string|max:255',
            'status_id' => 'required|uuid|exists:status,id',
            'start_date' => 'nullable|date',
            'final_date' => 'nullable|date|after_or_equal:start_date',
            'user_id' => 'required|uuid|exists:users,id',
            'comments' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = Task::create($request->all());

        return response()->json([
            'message' => 'Task created successfully.',
            'data' => $task,
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Get a specific task",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="UUID of the task",
     *         @OA\Schema(type="string", example="uuid-of-task")
     *     ),
     *     @OA\Response(response=200, description="Task found"),
     *     @OA\Response(response=404, description="Task not found")
     * )
     */
    public function show(string $id)
    {
        if (!Str::isUuid($id)) {
            return response()->json(['message' => 'Invalid ID.'], 400);
        }

        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found.'], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Task retrieved successfully.',
            'data' => $task,
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Update a task",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="UUID of the task",
     *         @OA\Schema(type="string", example="uuid-of-task")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="task", type="string", example="Update login system"),
     *             @OA\Property(property="status_id", type="string", example="uuid-of-status"),
     *             @OA\Property(property="data_inicio", type="string", format="date", example="2025-10-31"),
     *             @OA\Property(property="data_final", type="string", format="date", example="2025-11-05"),
     *             @OA\Property(property="comentarios", type="string", example="Updated comments")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Task updated successfully"),
     *     @OA\Response(response=404, description="Task not found"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'task' => 'sometimes|string|max:255',
            'status_id' => 'required|uuid|exists:status,id',
            'start_date' => 'nullable|date',
            'final_date' => 'nullable|date|after_or_equal:start_date',
            'user_id' => 'required|uuid|exists:users,id',
            'comments' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $task->update($request->all());

        return response()->json([
            'message' => 'Task updated successfully.',
            'data' => $task,
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Delete a task",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="UUID of the task",
     *         @OA\Schema(type="string", example="uuid-of-task")
     *     ),
     *     @OA\Response(response=200, description="Task deleted successfully"),
     *     @OA\Response(response=404, description="Task not found")
     * )
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found.'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully.']);
    }
}
