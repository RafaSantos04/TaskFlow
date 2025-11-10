// src/api/socket.ts
let socket: WebSocket | null = null;

export const connectSocket = (token: string) => {
    socket = new WebSocket(`ws://127.0.0.1:8000/ws?token=${token}`);

    socket.onopen = () => {
        console.log("✅ WebSocket conectado!");
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("📩 Mensagem recebida:", message);
        // aqui você pode despachar Redux actions futuramente
    };

    socket.onclose = () => {
        console.log("🔌 WebSocket desconectado!");
    };

    socket.onerror = (err) => {
        console.error("⚠️ Erro no WebSocket:", err);
    };
};

export const disconnectSocket = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
};

export const sendSocketMessage = (data: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
    }
};
