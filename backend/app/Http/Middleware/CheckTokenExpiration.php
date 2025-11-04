<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class CheckTokenExpiration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->user()?->currentAccessToken();

        if ($token && $token->expires_at && Carbon::now()->greaterThan($token->expires_at)) {
            // Token expirado → revoga o token e bloqueia a requisição
            $token->delete();

            return response()->json(['message' => 'Token expirado. Faça login novamente.'], 401);
        }

        return $next($request);
    }
}
