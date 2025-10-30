<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

//Auth
Route::post('/login', [AuthController::class, 'login']);

//Users (Register)
Route::post('/user', [UserController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {

    //Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    //Users
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);

});



