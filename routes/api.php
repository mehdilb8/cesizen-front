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

// Contenu Information (public)
Route::get('/contenus', [ContenuInformationController::class, 'index']);
Route::get('/contenus/{id}', [ContenuInformationController::class, 'show']);

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
    // Gestion des utilisateurs
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    
    // Gestion des contenus
    Route::post('/contenus', [ContenuInformationController::class, 'store']);
    Route::put('/contenus/{id}', [ContenuInformationController::class, 'update']);
    Route::delete('/contenus/{id}', [ContenuInformationController::class, 'destroy']);
    
    // Statistiques admin
    Route::get('/admin/stats', [AdminController::class, 'getStats']);
    Route::get('/admin/activity', [AdminController::class, 'getRecentActivity']);
    Route::get('/admin/charts', [AdminController::class, 'getChartData']);
}); 