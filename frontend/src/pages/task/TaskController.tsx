import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface TaskControllerProps {
    openProps: (open: boolean) => void;
    open: boolean;
}

export default function TaskController({ openProps, open }: TaskControllerProps) {
    const handleClose = () => {
        openProps(false);
    };

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pendente");

    // Lista mock (troque depois por API/store)
    const tasks = [
        { id: 1, name: "Limpar casa", status: "concluída" },
        { id: 2, name: "Estudar React", status: "pendente" },
        { id: 3, name: "Criar backend", status: "em andamento" },
        { id: 4, name: "Fazer compras", status: "pendente" },
        { id: 5, name: "Ler livro", status: "concluída" },
        { id: 6, name: "Exercitar-se", status: "em andamento" },
        { id: 7, name: "Cozinhar jantar", status: "pendente" },
        { id: 8, name: "Responder e-mails", status: "concluída" },
        { id: 9, name: "Planejar viagem", status: "em andamento" },
        { id: 10, name: "Organizar arquivos", status: "pendente" },
    ];

    const handleAddTask = () => {
        setName("");
        setDescription("");
        setStatus("pendente");
        console.log("Adicionar nova tarefa");
    }

    const handleSave = () => {
        console.log({ name, description, status });
        handleClose();
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
                                {tasks.map((task) => (
                                    <ListItem key={task.id} divider>
                                        <ListItemText
                                            primary={task.name}
                                            secondary={`Status: ${task.status}`}
                                        />
                                    </ListItem>
                                ))}
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

                        <TextField
                            select
                            fullWidth
                            label="Status"
                            margin="normal"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="pendente">Pendente</MenuItem>
                            <MenuItem value="em andamento">Em andamento</MenuItem>
                            <MenuItem value="concluída">Concluída</MenuItem>
                        </TextField>
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
    );
}
