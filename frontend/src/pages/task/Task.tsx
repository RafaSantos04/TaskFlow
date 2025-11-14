import { Box, Typography, Paper, TextField } from "@mui/material";

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

                {/* 🔵 TextField ocupando toda a largura */}
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

                {/* 🔶 Área das colunas */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        flex: 1,
                    }}
                >

                    {/* Coluna A Fazer */}
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

                    {/* Coluna Fazendo */}
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

                    {/* Coluna Concluído */}
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
