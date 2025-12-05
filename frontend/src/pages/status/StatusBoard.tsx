import { Box, IconButton, InputAdornment, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/index";
import { updateTask } from "@store/task";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { CommentEditor } from "./CommentEditor";

export default function StatusBoard() {
    const dispatch = useDispatch<AppDispatch>();
    const rawStatuses = useSelector((state: RootState) => state.status.items);
    const tasks = useSelector((state: RootState) => state.task.tasks);
    console.log(tasks);

    const statuses = [...rawStatuses].sort((a, b) => a.order - b.order);

    const [editing, setEditing] = useState(false);
    const [taskname, setTaskName] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const handleSave = () => {

    }

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
                                    position: "relative",
                                    p: 2,
                                    mb: 2,
                                    bgcolor: "#1b1b1b",
                                    borderRadius: 3,
                                    borderLeft: `6px solid ${tsk.relationship_status?.color || "#888"}`,
                                    transition: "0.15s ease",
                                    "&:hover": {
                                        bgcolor: "#242424",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                                    },
                                }}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography sx={{ fontSize: "17px", fontWeight: 600 }}>
                                        {tsk.task}
                                    </Typography>

                                    <TextField
                                        select
                                        size="small"
                                        value={tsk.status_id}
                                        onChange={(e) => dispatch(updateTask({ id: tsk.id, data: { task: tsk.task, status_id: e.target.value } }))}
                                        sx={{
                                            minWidth: 140,
                                            bgcolor: "#262626",
                                            borderRadius: 1,
                                            "& .MuiSelect-select": { py: 1 },
                                        }}
                                    >
                                        {statuses.map((st) => (
                                            <MenuItem key={st.id} value={st.id}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Box
                                                        sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: "50%",
                                                            backgroundColor: st.color,
                                                        }}
                                                    />
                                                    {st.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>

                                {tsk.comments && (
                                      <CommentEditor tsk={tsk} />
                                )}
                            </Paper>

                        ))}
                </Paper>
            ))}
        </Box>
    );
}
