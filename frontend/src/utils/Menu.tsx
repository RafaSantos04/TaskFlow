import { Box } from "@mui/material";

export default function Menu() {
    return (
        <Box
            className="menu-container"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                color: "white",
                fontSize: "18px",
                fontWeight: 500,
            }}
        >
       
            <Box
                sx={{
                    p: 1.5,
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                        bgcolor: "#ffffff20",
                    },
                }}
            >
                Dashboard
            </Box>

            <Box
                sx={{
                    p: 1.5,
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                        bgcolor: "#ffffff20",
                    },
                }}
            >
                Configurações
            </Box>
        </Box>
    );
}
