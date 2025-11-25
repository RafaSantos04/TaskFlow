import { Box, Typography, Paper, TextField, IconButton, Tooltip } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useEffect, useState } from "react";
import TaskController from "./TaskController";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@store/index';
import { fetchTasks } from '@store/task';
import { fetchStatus } from "@store/status";
// import StatusBoard from "@pages/status/StatusBoard";
import StatusController from "@pages/status/StatusController";
import AllInboxIcon from '@mui/icons-material/AllInbox';


export default function Task() {
    const status = useSelector((state: RootState) => state.status.items);
    const dispatch = useDispatch<AppDispatch>();
    const [openTask, setOpenTask] = useState<boolean>(false);
    const [openStatus, setOpenStatus] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchStatus())
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleClickOpen = (type: "status" | "task") => {
        const map = {
            status: () => setOpenStatus(true),
            task: () => setOpenTask(true)
        };
        map[type]();
    };

    return (

        <>

            <Box
                sx={{
                    p: 4,
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >

                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#0000009f",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Tooltip title="Gerenciar status" placement="top" arrow>
                            <IconButton
                                onClick={() => handleClickOpen('status')}
                                size="small"
                                sx={{
                                    ml: 2,
                                    color: "white",
                                    transition: "0.3s",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.15)",
                                        color: "#9097f9ff",
                                    },
                                }}
                            >
                                <AllInboxIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Gerenciar tarefa(s)" placement="top" arrow>
                            <IconButton
                                onClick={() => handleClickOpen('task')}
                                size="small"
                                sx={{
                                    ml: 2,
                                    color: "white",
                                    transition: "0.3s",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.15)",
                                        color: "#9097f9ff",
                                    },
                                }}
                            >
                                <AssignmentIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    Gerencie suas tarefas de forma eficiente.


                </Paper>


                <TextField
                    fullWidth
                    id="search-task"
                    label="Buscar tarefa..."
                    variant="standard"

                    sx={{
                        "& .MuiInputBase-input": {
                            color: "#fff",              // cor do texto digitado
                        },
                        "& .MuiInputLabel-root": {
                            color: "#ffffff99",         // cor do label (branco com opacidade)
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#fff",              // label branco quando focado
                        },
                        "& .MuiInput-underline:before": {
                            borderBottomColor: "#ffffff60", // linha antes do foco
                        },
                        "& .MuiInput-underline:hover:before": {
                            borderBottomColor: "#ffffff90", // hover
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "#fff",      // linha quando focado
                        },
                    }}
                />
                {/* <StatusBoard /> */}
            </Box>
            <TaskController openProps={setOpenTask} open={openTask} />
            <StatusController openProps={setOpenStatus} open={openStatus} />
        </>
    );
}
