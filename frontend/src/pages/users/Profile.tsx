import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Typography,
    Box,
    Divider,
} from "@mui/material";

export default function Profile() {
    const user = useSelector((state: RootState) => state.user.selectedUser);
    console.log(user);


    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        console.log("Salvando alterações:", { name, email });
        setIsEditing(false);
    };

    if (!user) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Nenhum usuário selecionado.
            </Typography>
        );
    }

    return (
        <Box display="flex" justifyContent="center" mt={5}>
            <Card sx={{ width: 420, boxShadow: 3, borderRadius: 3 }}>
                <CardHeader
                    title="Perfil do Usuário"
                    subheader="Visualize e edite suas informações"
                />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Nome"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                    />

                    <TextField
                        fullWidth
                        label="E-mail"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                    />
                    {/* 
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Criado em: {new Date(user?.created_at).toLocaleString("pt-BR")}
                    </Typography> */}

                    <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                        {!isEditing ? (
                            <Button variant="contained" onClick={() => setIsEditing(true)}>
                                Editar
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        setName(user.name);
                                        setEmail(user.email);
                                        setIsEditing(false);
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleSave}>
                                    Salvar
                                </Button>
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
