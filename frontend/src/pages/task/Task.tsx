import { Box, Typography, Paper, TextField, IconButton, Tooltip } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Task() {
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
                        <Tooltip title="Criar tarefa(s)" arrow>
                            <IconButton
                                size="small"
                                sx={{
                                    ml: 2,
                                    color: "white",
                                    transition: "0.3s",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.15)", 
                                        color: "#90caf9",
                                    },
                                }}
                            >
                                <AddBoxIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar tarefa(s)" arrow>
                            <IconButton
                                size="small"
                                sx={{
                                    ml: 2,
                                    color: "white",
                                    transition: "0.3s",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.15)", 
                                        color: "#90caf9", 
                                    },
                                }}
                            >
                                <DeleteIcon />
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

           
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        flex: 1,
                    }}
                >

                
                    <Paper
                        elevation={3}
                        sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            backgroundColor: "#0000009f",
                        }}
                    >
                        <Typography variant="h6" fontWeight={700} color="white">
                            A Fazer
                        </Typography>
                    </Paper>

         
                    <Paper
                        elevation={3}
                        sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            backgroundColor: "#0000009f",
                        }}
                    >
                        <Typography variant="h6" fontWeight={700} color="white">
                            Fazendo
                        </Typography>
                    </Paper>

               
                    <Paper
                        elevation={3}
                        sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            backgroundColor: "#0000009f",
                        }}
                    >
                        <Typography variant="h6" fontWeight={700} color="white">
                            Concluído
                        </Typography>
                    </Paper>

                </Box>
            </Box>


        </>
    );
}
