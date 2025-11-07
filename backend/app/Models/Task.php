<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


/**
 * @OA\Schema(
 *     schema="Task",
 *     title="Task",
 *     description="Represents a task within the system.",
 *     @OA\Property(property="id", type="string", format="uuid", example="9da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
 *     @OA\Property(property="task", type="string", example="Tarefa de exemplo"),
 *     @OA\Property(property="status_id", type="string", example="Pendente"),
 *     @OA\Property(property="start_date", type="date", example="2025-11-03"),
 *     @OA\Property(property="final_date", type="date", example="2025-11-03"),
 *     @OA\Property(property="user_id", type="string", example="9da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
 *     @OA\Property(property="comments", type="string", example="No comments"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-03T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-11-03T12:10:00Z")
 * )
 */
class Task extends Model
{
    use HasFactory;

    protected $table = 'task';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'task',
        'status_id',
        'start_date',
        'final_date',
        'user_id',
        'comments',
    ];

    /**
     * Automatically generates UUID upon creation.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Relationship with status
     */
    public function relationshipStatus()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    /**
     * Relationship with the user
     */
    public function relationshipUser()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
