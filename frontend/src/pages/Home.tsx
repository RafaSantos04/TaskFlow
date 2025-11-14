import { Box } from "@mui/material";
import Menu from "@utils/Menu";
import Options from "@utils/Options";

export default function Home() {
    return (
        <Box
            className="home-container"
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
            }}
        >
            {/* Coluna Menu */}
            <Box
                sx={{
                    width: "250px",        // largura fixa do menu
                    minWidth: "250px", // opcional
                    borderRight: "1px solid #ffffff40", // ← linha vertical
                    p: 2,
                }}
            >
                <Menu />
            </Box>

            {/* Coluna Options */}
            <Box
                sx={{
                    flex: 1,
                    p: 2,
                    overflowY: "auto",
                }}
            >
                <Options />
            </Box>
        </Box>
    );
}
