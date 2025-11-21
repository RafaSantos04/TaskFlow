import {
    useEffect,
    useState
} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Typography,
    Box,
    IconButton,
    Tooltip,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import type { AppDispatch } from '@store/index';
import type { RootState } from "@store/index";

import {
    createTask,
    updateTask,
    fetchTaskById,
    clearSelectedTask,
    fetchTasks,
    deleteTask,
} from "@store/task";

interface TaskControllerProps {
    openProps: (open: boolean) => void;
    open: boolean;
}

export default function TaskController({ openProps, open }: TaskControllerProps) {
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const selectedTask = useSelector((state: RootState) => state.task.selectedTask);
    const status = useSelector((state: RootState) => state.status.items);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    useEffect(() => {
        if (selectedTask) {
            setName(selectedTask.task);
            setDescription(selectedTask.comments ?? "");
            setTaskStatus(selectedTask.status_id);
        }
    }, [open, selectedTask]);

    const handleCleanToAddTask = () => {
        dispatch(clearSelectedTask());
        setName("");
        setDescription("");
        setTaskStatus("");
    };

    const handleSelectTask = (task: any) => {
        // carrega selectedTask (thunk que popula state.task.selectedTask)
        dispatch(fetchTaskById(task.id));
    };

    const handleDeleteTask = async (id: string) => {
        try {
            // confirm opcional (pode trocar por dialog bonito)
            if (!confirm("Confirm delete task?")) return;
            await dispatch(deleteTask(id)).unwrap();
            // opcional: recarregar lista (se seu slice não atualizar corretamente)
            dispatch(fetchTasks());
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleSave = async () => {
        try {
            if (selectedTask) {
                await dispatch(updateTask({
                    id: selectedTask.id,
                    data: {
                        task: name,
                        comments: description,
                        status_id: taskStatus
                    }
                })).unwrap();
            } else {
                await dispatch(createTask({
                    task: name,
                    comments: description,
                    status_id: taskStatus
                })).unwrap();
            }
        } catch (error) {
            console.log(error);
        }
        handleClose();
    };

    const handleClose = () => {
        dispatch(clearSelectedTask());
        openProps(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Gerenciar Tarefas

                <Tooltip title="Adicionar nova tarefa" arrow>
                    <IconButton
                        aria-label="add_task"
                        onClick={handleCleanToAddTask}
                        sx={{ ml: 2 }}
                    >
                        <AddBoxIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>

            <DialogContent dividers >
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={3}
                >

                    <Box flex={1}>
                        <Typography variant="h6" mb={1}>
                            Tarefas Listadas
                        </Typography>

                        <Box
                            border="1px solid #ccc"
                            borderRadius={2}
                            maxHeight={350}
                            overflow="auto"
                        >
                            {/* Proteção: garante que tasks é array antes de map */}
                            {Array.isArray(tasks) && tasks.length > 0 ? (
                                <List>
                                    {tasks.map((t: any) => (
                                        <ListItem
                                            key={t.id}
                                            disablePadding
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // evita selecionar o item
                                                        handleDeleteTask(t.id);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemButton
                                                onClick={() => handleSelectTask(t)}
                                                selected={selectedTask?.id === t.id}
                                            >
                                                <ListItemText
                                                    primary={t.task}
                                                    // Proteção com optional chaining
                                                    secondary={`Status: ${t.relationship_status?.name ?? t.status_id ?? '—'}`}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography p={2} textAlign="center" color="text.secondary">
                                    Nenhuma tarefa registrada
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Box flex={1}>
                        <Typography variant="h6" mb={1}>
                            {selectedTask ? "Editar Tarefa" : "Adicionar Tarefa"}
                        </Typography>

                        <TextField
                            fullWidth
                            label="Nome da tarefa"
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Descrição"
                            margin="normal"
                            multiline
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {status &&
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                margin="normal"
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                            >
                                {status.map((s: any) => (
                                    <MenuItem key={s.id} value={s.id}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>
                    {selectedTask ? "Atualizar Tarefa" : "Salvar Tarefa"}
                </Button>
            </DialogActions>
        </Dialog>
    );
} 
