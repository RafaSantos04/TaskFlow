<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    /*
     * Relationship with Status (a task belongs to a status)
     */
    public function relationshipTask()
    {
        return $this->hasMany(Tarefa::class, 'status_id');
    }
}
