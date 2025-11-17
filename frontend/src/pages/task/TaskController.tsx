import {
    // useEffect,
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
    List,
    // ListItem,
    // ListItemText,
    Typography,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import type { AppDispatch } from '@store/index';
import type { RootState } from "@store/index";



interface TaskControllerProps {
    openProps: (open: boolean) => void;
    open: boolean;
}

export default function TaskController({ openProps, open }: TaskControllerProps) {
    const status = useSelector((state: RootState) => state.status.items);
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        openProps(false);
    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const handleAddTask = () => {
        setName("");
        setDescription("");
        console.log("Adicionar nova tarefa");
    }

    const handleSave = () => {
        console.log({ name, description, status });
        handleClose();
    };

    return (
        <>
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
                            onClick={handleAddTask}
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
                                <List>
                                    {/* {tasks.map((task) => (
                                    <ListItem key={task.id} divider>
                                        <ListItemText
                                            primary={task.name}
                                            secondary={`Status: ${task.status}`}
                                        />
                                    </ListItem>
                                ))} */}
                                </List>
                            </Box>
                        </Box>

                        <Box flex={1}>
                            <Typography variant="h6" mb={1}>
                                Adicionar Tarefa
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
                                        <MenuItem key={s.id || s.name} value={s.name}>
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
                        Salvar Tarefa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
