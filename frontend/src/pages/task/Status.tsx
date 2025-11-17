import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import type { AppDispatch, RootState } from '@store/index';
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function Status() {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.status.items);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    flex: 1,
                }}
            >
                {status.map((st) => (
                    <Paper
                        key={st.id}
                        elevation={3}
                        sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            backgroundColor: "#0000009f",
                            overflowX: 'auto'
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight={700}
                                color="white"
                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                            >
                                {st.name}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Tooltip title="Editar status" placement="top" arrow>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: "white",
                                            "&:hover": {
                                                color: "#9097f9ff",
                                                bgcolor: "rgba(255,255,255,0.12)",
                                            },
                                        }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Excluir status" placement="top" arrow>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: "#ff6b6b",
                                            "&:hover": {
                                                color: "#ff8787",
                                                bgcolor: "rgba(255,50,50,0.15)",
                                            },
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        {/* Aqui você pode renderizar as tarefas filtradas pelo status */}
                        {/* Exemplo:
                                {tasks
                                    ?.filter(t => t.status_id === st.id)
                                    ?.map(task => (
                                        <TaskCard key={task.id} task={task} />
                                    ))
                                }
                                */}
                    </Paper>
                ))}
            </Box>
        </>
    );
}