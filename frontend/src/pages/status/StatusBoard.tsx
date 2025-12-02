import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

export default function StatusBoard() {

    const rawStatuses = useSelector((state: RootState) => state.status.items);
    const tasks = useSelector((state: RootState) => state.task.tasks);

    // Ordena por order ASC
    const statuses = [...rawStatuses].sort((a, b) => a.order - b.order);

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                py: 2,
                height: "92%",
            }}
        >
            {statuses.map((st: any) => (
                <Paper
                    key={st.id}
                    elevation={3}
                    sx={{
                        minWidth: 300,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#121212",
                        color: "white",
                        flexShrink: 0,
                         overflowY: "auto",
                        borderTop: `4px solid ${st.color ?? "#9097f9"}`, // cor do status
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: 700, color: st.color ?? "#9097f9" }}
                    >
                        {st.name}
                    </Typography>

                    {tasks
                        .filter((tsk: any) => tsk.status_id === st.id)
                        .map((tsk: any) => (
                            <Paper
                                key={tsk.id}
                                sx={{
                                    p: 1.5,
                                    mb: 2,
                                    bgcolor: "#1e1e1e",
                                    border: "1px solid #9097f933",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    transition: "0.2s",
                                    "&:hover": {
                                        bgcolor: "#262626",
                                        transform: "scale(1.02)",
                                    },
                                }}
                            >
                                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                                    {tsk.task}
                                </Typography>
                                 <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                                    {tsk.comments}
                                </Typography>
                            </Paper>
                        ))}
                </Paper>
            ))}
        </Box>
    );
}
