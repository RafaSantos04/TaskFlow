import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box, Divider, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, logout } from "@store/auth";
import type { AppDispatch } from "@store/index";
import { useDispatch } from "react-redux";
import { gettingUser } from "@store/users";
import HomeIcon from '@mui/icons-material/Home';
import tarefaLogo from "@assets/tarefa.png";


export default function TopBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleAvatarClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAvatarClickClose = () => {
        setAnchorEl(null);
    };

    const handleFromHome = () => {
        navigate("/home");
    };

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
        // <AppBar position="fixed" color="secondary" className="topbar">
        <AppBar position="fixed" sx={{ backgroundColor: "#0000009f", }} className="topbar">
            <Toolbar className="topbar-toolbar">

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        // cursor: "pointer",
                        // "&:hover": { color: "#b3d9ff" },
                    }}
                >
                    <img
                        src={tarefaLogo}
                        alt="Logo TaskFlow"
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 8,
                            borderRadius: 6,
                            objectFit: "contain",
                        }}
                    />

                    <Typography
                        variant="h6"
                        className="topbar-logo"
                        sx={{ fontWeight: 600 }}
                    >
                        TaskFlow
                    </Typography>

                    <Box sx={{ ml: 3 }}>
                        <Tooltip title="Página Inicial" arrow>
                            <IconButton
                                onClick={handleFromHome}
                                sx={{
                                    color: "#fff",
                                    "&:hover": {
                                        color: "#9097f9ff",
                                        bgcolor: "rgba(255,255,255,0.1)"
                                    }
                                }}
                            >
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>



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
                        <MenuItem onClick={handleFromHome}>Home</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
