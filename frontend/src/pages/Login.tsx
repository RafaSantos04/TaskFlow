import LoginForm from "@components/LoginFrom";
import { Box, Container, Typography, Paper } from "@mui/material";


export default function LoginPage() {
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",

            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" gutterBottom fontWeight={600}>
                    TaskFlow
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Faça login para acessar suas tarefas
                </Typography>
                <Box mt={4}>
                    <LoginForm />
                </Box>
            </Paper>
        </Container>
    );
}
