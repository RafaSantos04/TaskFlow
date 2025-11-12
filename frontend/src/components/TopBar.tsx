import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, logout } from "@store/auth";
import type { AppDispatch } from "@store/index";
import { useDispatch } from "react-redux";
import { gettingUser } from "@store/users";


export default function TopBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // Abre o menu do avatar
    const handleAvatarClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Fecha o menu do avatar
    const handleAvatarClickClose = () => {
        setAnchorEl(null);
    };

    // Navega para o perfil
    const handleProfileClick = async () => {
        handleAvatarClickClose();

        const userId = localStorage.getItem("id");
        if (!userId) {
            console.error("ID do usuário não encontrado no localStorage.");
            navigate("/");
            return;
        }

        try {
            await dispatch(gettingUser({ id: userId })).unwrap();
            navigate("/profile");
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    };

    // Faz logout com integração Redux
    const handleLogout = async () => {
        handleAvatarClickClose();
        try {
            await dispatch(logoutUser()).unwrap();
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        } finally {
            dispatch(logout());
            navigate("/");
        }
    };

    return (
        <AppBar position="fixed" color="primary" className="topbar">
            <Toolbar className="topbar-toolbar">
                {/* Logo / Nome da aplicação */}
                <Typography variant="h6" sx={{ flexGrow: 1 }} className="topbar-logo">
                    TaskFlow
                </Typography>

                {/* Menu do usuário */}
                <Box>
                    <IconButton onClick={handleAvatarClickOpen} size="large" sx={{ p: 0 }}>
                        <Avatar alt="Usuário" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleAvatarClickClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
