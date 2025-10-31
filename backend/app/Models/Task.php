<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
            if (! $model->id) {
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
