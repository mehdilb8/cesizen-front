<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContenuInformationController;
use App\Http\Controllers\ExerciceRespirationController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Utilisateur
Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'profile']);
Route::middleware(['auth:sanctum', 'admin'])->get('/users', [UserController::class, 'index']);
Route::middleware(['auth:sanctum', 'admin'])->post('/users', [UserController::class, 'store']);
Route::middleware(['auth:sanctum', 'admin'])->put('/users/{id}', [UserController::class, 'update']);
Route::middleware(['auth:sanctum', 'admin'])->delete('/users/{id}', [UserController::class, 'destroy']);

// Contenu Information
Route::get('/contenus', [ContenuInformationController::class, 'index']);
Route::get('/contenus/{id}', [ContenuInformationController::class, 'show']);
Route::middleware(['auth:sanctum', 'admin'])->post('/contenus', [ContenuInformationController::class, 'store']);
Route::middleware(['auth:sanctum', 'admin'])->put('/contenus/{id}', [ContenuInformationController::class, 'update']);
Route::middleware(['auth:sanctum', 'admin'])->delete('/contenus/{id}', [ContenuInformationController::class, 'destroy']);

// Exercices de respiration
Route::get('/exercices', [ExerciceRespirationController::class, 'index']);
Route::get('/exercices/{id}', [ExerciceRespirationController::class, 'show']);
Route::middleware('auth:sanctum')->post('/exercices/{id}/favori', [ExerciceRespirationController::class, 'addFavori']);
Route::middleware('auth:sanctum')->delete('/exercices/{id}/favori', [ExerciceRespirationController::class, 'removeFavori']);
Route::middleware('auth:sanctum')->get('/exercices/favoris', [ExerciceRespirationController::class, 'favoris']);
Route::middleware('auth:sanctum')->post('/sessions', [ExerciceRespirationController::class, 'startSession']);
Route::middleware('auth:sanctum')->put('/sessions/{id}/end', [ExerciceRespirationController::class, 'endSession']);
Route::middleware('auth:sanctum')->get('/sessions', [ExerciceRespirationController::class, 'userSessions']);
Route::middleware('auth:sanctum')->get('/statistiques', [ExerciceRespirationController::class, 'userStats']);

// Routes d'administration (protégées par middleware admin)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Statistiques admin
    Route::get('/admin/stats', [AdminController::class, 'getStats']);
    Route::get('/admin/activity', [AdminController::class, 'getRecentActivity']);
    Route::get('/admin/charts', [AdminController::class, 'getChartData']);
}); 