<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @OA\Schema(
 *     schema="Status",
 *     type="object",
 *     title="Status",
 *     description="Represents a task status entity within the system",
 *     @OA\Property(property="id", type="string", format="uuid", example="9da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
 *     @OA\Property(property="name", type="string", example="In Progress"),
 *     @OA\Property(property="color", type="string", example="#FFA500"),
 *     @OA\Property(property="description", type="string", example="Tasks currently being worked on"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-02T10:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-11-02T10:30:00Z")
 * )
 */
class Status extends Model
{
    use HasFactory;

    protected $table = 'status';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'color',
        'description',
        'order',
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

    /*
     * Relationship with Task (a status has many tasks)
     */
    public function relationshipTask()
    {
        return $this->hasMany(Task::class, 'status_id');
    }
}
