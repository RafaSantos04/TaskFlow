<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @OA\Schema(
 *     schema="Profile",
 *     title="Profile",
 *     description="Represents a user role or permission group within the system.",
 *     @OA\Property(property="id", type="string", format="uuid", example="4da9934b-cede-4f05-ba1c-38ab1f55ccf9"),
 *     @OA\Property(property="name", type="string", example="Administrator"),
 *     @OA\Property(property="description", type="string", example="Full access to all system features."),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-03T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-11-03T12:10:00Z")
 * )
 */
class Profile extends Model
{
    use HasFactory;

    protected $table = 'profile';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Automatically generate UUID upon creation.
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
     * Relationship with User.
     * A profile can belong to multiple users.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'profile_id');
    }


    /**
     * Relationship with Menus.
     * A profile can belong to multiple menus.
     */
    public function menu()
    {
        return $this->belongsToMany(Menu::class, 'menu_profile', 'profile_id', 'menu_id')
            ->withTimestamps();
    }
}
