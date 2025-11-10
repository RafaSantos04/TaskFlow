import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser, logout } from "@store/auth";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "@store/index";

interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user, token, loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const login = async (email: string, password: string) => {
        const result = await dispatch(authUser({ email, password }));

        // Verifica se a autenticação foi bem-sucedida
        if (authUser.fulfilled.match(result)) {
            navigate("/home");
        } else {
            console.error("Falha ao logar:", result.payload);
        }
    };

    const logoutUser = () => {
        dispatch(logout());
        navigate("/");
    };

    // 🔄 Revalida token se estiver no localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken && !token) {
            // poderia chamar aqui um "refresh" ou revalidação via backend futuramente
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                login,
                logoutUser,
                isAuthenticated: !!token && !!user,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
