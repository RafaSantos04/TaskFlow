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
            <Box
                sx={{
                    width: "250px",        
                    minWidth: "250px", 
                    borderRight: "1px solid #ffffff40", 
                    p: 2,
                }}
            >
                <Menu />
            </Box>

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
