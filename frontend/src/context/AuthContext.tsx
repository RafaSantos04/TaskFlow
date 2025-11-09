import { createContext, useContext, useState, useEffect, } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const navigate = useNavigate();

    // Se tiver token salvo, mantém a sessão ao recarregar a página
    useEffect(() => {
        if (token) {
            // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;  //chamada do store posteriormente
            fetchUser();
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/user"); // rota protegida //verificado com store posteriormente
            setUser(data);
        } catch {
            logout();
        }
    };

    const login = async (email: string, password: string) => {

        // validação pelo store posteriormente
        try {
            const { data } = await axios.post("http://localhost:8000/api/login", { email, password });
            localStorage.setItem("token", data.token);
            setToken(data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            await fetchUser();
            navigate("/home");
        } catch (err) {
            console.error("Erro ao logar:", err);
            throw err;
        }
    };

    const logout = () => {
        // validação pelo store posteriormente
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!user && !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
