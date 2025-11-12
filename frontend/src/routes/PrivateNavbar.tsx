import { Outlet } from "react-router-dom";
import { Toolbar, Box } from "@mui/material";
import TopBar from "@components/TopBar";

export default function PrivateNavbar() {
    return (
        <>
            <TopBar />

            <Toolbar />
            <Box className="private-navbar-content">
                <Outlet /> {/* Renderiza as rotas filhas aqui */}
            </Box>
        </>
    );
}
