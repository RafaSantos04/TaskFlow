import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Exemplo de autenticação fake (você depois troca pelo AuthContext ou axios)
            await new Promise((res) => setTimeout(res, 1000));
            console.log("Login realizado com:", { email, password });
        } catch (error) {
            console.error("Erro ao logar:", error);
        } finally {
            setLoading(false);
        }
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
                            <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
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
