import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { MdAddTask, MdListAlt } from "react-icons/md";
import Grid from "@mui/material/Grid";


export default function Home() {
    return (
        <Box className="home-container">
            {/* Cabeçalho da Home */}
            <Box className="home-header">
                <Typography variant="h4" className="home-title">
                    TaskFlow Dashboard
                </Typography>
                <Typography variant="subtitle1" className="home-subtitle">
                    Organize suas tarefas e mantenha seu fluxo produtivo
                </Typography>
            </Box>

            <Divider className="home-divider" />

            {/* Área de Ações */}
            <Box className="home-actions">
                <Grid container spacing={2} justifyContent="center">
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<MdAddTask />}
                            className="btn-add-task"
                        >
                            Nova Tarefa
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<MdListAlt />}
                            className="btn-view-tasks"
                        >
                            Ver Tarefas
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Área de Conteúdo */}
            <Box className="home-content">
                <Grid container spacing={3}>
                    <Grid>
                        <Paper className="home-panel">
                            <Typography variant="h6">Tarefas Recentes</Typography>
                            <Typography variant="body2">
                                Exibe as últimas tarefas criadas.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper className="home-panel">
                            <Typography variant="h6">Resumo do Dia</Typography>
                            <Typography variant="body2">
                                Estatísticas e progresso das suas tarefas.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
