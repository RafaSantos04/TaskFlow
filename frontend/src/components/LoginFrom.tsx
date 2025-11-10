import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useAuth } from "@context/AuthContext";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="E-mail"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Senha"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                                {/* Ícone de visibilidade */}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, py: 1.2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
            </Button>
        </Box>
    );
}
