<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Récupérer le profil de l'utilisateur connecté
     */
    public function profile()
    {
        return response()->json(Auth::user());
    }

    /**
     * Afficher la liste de tous les utilisateurs (admin uniquement)
     */
    public function index()
    {
        $users = Utilisateur::select('id_utilisateur', 'nom', 'prenom', 'email', 'id_role', 'statut', 'created_at')
                    ->orderBy('created_at', 'desc')
                    ->get();
        
        return response()->json($users);
    }

    /**
     * Créer un nouveau utilisateur (admin uniquement)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateur,email',
            'mot_de_passe' => 'required|string|min:6',
            'id_role' => 'required|integer|in:1,2',
            'statut' => 'required|string|in:actif,inactif'
        ], [
            'nom.required' => 'Le nom est obligatoire',
            'prenom.required' => 'Le prénom est obligatoire',
            'email.required' => 'L\'email est obligatoire',
            'email.email' => 'Format d\'email invalide',
            'email.unique' => 'Cet email est déjà utilisé',
            'mot_de_passe.required' => 'Le mot de passe est obligatoire',
            'mot_de_passe.min' => 'Le mot de passe doit contenir au moins 6 caractères',
            'id_role.in' => 'Le rôle doit être 1 (utilisateur) ou 2 (admin)',
            'statut.in' => 'Le statut doit être actif ou inactif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreurs de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Utilisateur::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'mot_de_passe' => Hash::make($request->mot_de_passe),
                'id_role' => $request->id_role,
                'statut' => $request->statut
            ]);

            return response()->json([
                'message' => 'Utilisateur créé avec succès',
                'user' => $user
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher un utilisateur spécifique
     */
    public function show($id)
    {
        $user = Utilisateur::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        return response()->json($user);
    }

    /**
     * Mettre à jour un utilisateur (admin uniquement)
     */
    public function update(Request $request, $id)
    {
        $user = Utilisateur::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateur,email,' . $id . ',id_utilisateur',
            'mot_de_passe' => 'nullable|string|min:6',
            'id_role' => 'required|integer|in:1,2',
            'statut' => 'required|string|in:actif,inactif'
        ], [
            'nom.required' => 'Le nom est obligatoire',
            'prenom.required' => 'Le prénom est obligatoire',
            'email.required' => 'L\'email est obligatoire',
            'email.email' => 'Format d\'email invalide',
            'email.unique' => 'Cet email est déjà utilisé',
            'mot_de_passe.min' => 'Le mot de passe doit contenir au moins 6 caractères',
            'id_role.in' => 'Le rôle doit être 1 (utilisateur) ou 2 (admin)',
            'statut.in' => 'Le statut doit être actif ou inactif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreurs de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $updateData = [
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'id_role' => $request->id_role,
                'statut' => $request->statut
            ];

            // Mettre à jour le mot de passe seulement s'il est fourni
            if (!empty($request->mot_de_passe)) {
                $updateData['mot_de_passe'] = Hash::make($request->mot_de_passe);
            }

            $user->update($updateData);

            return response()->json([
                'message' => 'Utilisateur mis à jour avec succès',
                'user' => $user->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un utilisateur (admin uniquement)
     */
    public function destroy($id)
    {
        $user = Utilisateur::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        // Empêcher la suppression de son propre compte
        if (auth()->user()->id_utilisateur == $id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas supprimer votre propre compte'
            ], 403);
        }

        try {
            $user->delete();

            return response()->json([
                'message' => 'Utilisateur supprimé avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 