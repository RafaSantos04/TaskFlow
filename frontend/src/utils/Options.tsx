import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Options() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
            }}
        >


            <Box
                onClick={() => navigate("/tasks")}
                sx={{
                    bgcolor: "#8d8d8dff",
                    color: "white",
                    p: 3,
                    width: "60px",
                    height: "60px",
                    textAlign: "center",
                    borderRadius: 2,
                    cursor: "pointer",
                    fontSize: "14px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 600,
                    transition: "0.3s",
                    "&:hover": {
                        bgcolor: "#9097f9ff",
                    },
                }}
            >
                Tarefas
            </Box>


            {/* <Box
                // onClick={() => navigate("/calendar")}
                sx={{
                    bgcolor: "#8d8d8dff",
                    color: "white",
                    p: 3,
                    width: "60px",
                    height: "60px",
                    textAlign: "center",
                    borderRadius: 2,
                    cursor: "pointer",
                    fontSize: "14px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 600,
                    transition: "0.3s",
                    "&:hover": {
                        bgcolor: "#9097f9ff",
                    },
                }}
            >
                Calendário
            </Box> */}

        </Box>
    );
}
