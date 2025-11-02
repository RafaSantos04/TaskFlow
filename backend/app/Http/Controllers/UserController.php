<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use HasFactory, Notifiable;

    public function index(Request $request)
    {

        $users = User::get();
        return response()->json([
            'success' => true,
            'message' => 'Usuários recuperados com sucesso.',
            'data' => $users,
        ]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:3',
            'profile_id' => 'nullable|uuid|exists:profile,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $profileId = $request->filled('profile_id')
            ? $request->profile_id
            : Profile::where('name', 'User')->first()?->id;

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'profile_id' => $profileId,
        ];

        $user = User::create($userData);

        return response()->json([
            'message' => 'Usuário criado com sucesso',
            'user' => $user,
        ], 201);
    }

    public function show(string $id)
    {

        if (!\Illuminate\Support\Str::isUuid($id)) {
            return response()->json(['message' => 'ID inválido.'], 400);
        }

        $user = User::find($id);


        if (!$user) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        }


        return response()->json([
            'success' => true,
            'message' => 'Usuário recuperado com sucesso.',
            'data' => $user,
        ]);
    }

    public function update(Request $request, string $id)
    {

        $user = User::find($id);


        if (!$user) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        }


        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:3',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }


        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($request->has('profile_id')) {
            $user->profile_id = $request->profile_id;
        }

        $user->save();

        return response()->json([
            'message' => 'Usuário atualizado com sucesso.',
            'user' => $user,
        ]);
    }

    public function destroy(string $id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        }


        $user->delete();

        return response()->json([
            'message' => 'Usuário deletado com sucesso.',
        ]);
    }
}