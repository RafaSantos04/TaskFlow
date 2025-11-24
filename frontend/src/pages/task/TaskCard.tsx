import { Paper, Typography } from "@mui/material";

export default function TaskCard({ task }: any) {
    return (
        <Paper
            sx={{
                p: 1.5,
                backgroundColor: "white",
                borderRadius: 1,
                cursor: "grab",
                "&:hover": { backgroundColor: "#f5f5f5" },
            }}
        >
            <Typography fontWeight={600}>{task.task}</Typography>

            {task.comments && (
                <Typography variant="body2" color="text.secondary">
                    {task.comments}
                </Typography>
            )}
        </Paper>
    );
}
