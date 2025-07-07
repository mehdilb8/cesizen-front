<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ExerciceController;
use App\Http\Controllers\SessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par authentification
Route::middleware('auth:sanctum')->group(function () {
    // Profil utilisateur
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Blog
    Route::get('/articles', [BlogController::class, 'index']);
    Route::get('/articles/{id}', [BlogController::class, 'show']);
    
    // Exercices de respiration
    Route::get('/exercices', [ExerciceController::class, 'index']);
    Route::get('/exercices/{id}', [ExerciceController::class, 'show']);
    
    // Sessions de respiration
    Route::get('/sessions', [SessionController::class, 'index']);
    Route::post('/sessions', [SessionController::class, 'store']);
    Route::put('/sessions/{id}', [SessionController::class, 'update']);
});

// Routes d'administration (protégées par middleware admin)
Route::middleware(['auth:sanctum', App\Http\Middleware\AdminMiddleware::class])->group(function () {
    
    // Gestion des utilisateurs (CRUD complet)
    Route::resource('users', UserController::class)->except(['create', 'edit']);
    
    // Statistiques et données du dashboard admin
    Route::get('/admin/stats', [AdminController::class, 'getStats']);
    Route::get('/admin/activity', [AdminController::class, 'getRecentActivity']);
    Route::get('/admin/charts', [AdminController::class, 'getChartData']);
    
    // Gestion des articles (pour les administrateurs)
    Route::post('/articles', [BlogController::class, 'store']);
    Route::put('/articles/{id}', [BlogController::class, 'update']);
    Route::delete('/articles/{id}', [BlogController::class, 'destroy']);
    
    // Gestion des exercices (pour les administrateurs)
    Route::post('/exercices', [ExerciceController::class, 'store']);
    Route::put('/exercices/{id}', [ExerciceController::class, 'update']);
    Route::delete('/exercices/{id}', [ExerciceController::class, 'destroy']);
}); 