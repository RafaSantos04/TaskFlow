<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @OA\Schema(
 *     schema="Menu",
 *     title="Menu",
 *     description="Represents a menu item within the system.",
 *     @OA\Property(property="id", type="string", format="uuid", example="9da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
 *     @OA\Property(property="name", type="string", example="Dashboard"),
 *     @OA\Property(property="slug", type="string", example="dashboard"),
 *     @OA\Property(property="icon", type="string", example="home"),
 *     @OA\Property(property="url", type="string", example="/dashboard"),
 *     @OA\Property(property="order", type="integer", example=1),
 *     @OA\Property(property="is_active", type="boolean", example=true),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-03T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-11-03T12:10:00Z")
 * )
 */
class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'url',
        'order',
        'is_active',
    ];
    protected $table = 'menu';
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    /*
     * Relationship with Profile (a menu can belong to many profiles)
     */
    public function profile()
    {
        return $this->belongsToMany(Profile::class, 'menu_profile', 'menu_id', 'profile_id')
            ->withTimestamps();
    }
}
