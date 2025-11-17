import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@api/http";

export interface Task {
    id: string;
    task: string;
    status_id: string;
    start_date?: string | null;
    final_date?: string | null;
    user_id?: string;
    comments?: string | null;
}

interface TasksState {
    tasks: Task[];
    selectedTask: Task | null;
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    selectedTask: null,
    loading: false,
    error: null,
};

/* ============================================================
   GET /task  – Buscar todas as tasks
============================================================ */
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
    try {
        const response = await http.get("/task");
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao buscar tarefas");
    }
}
);

/* ============================================================
   POST /task – Criar task
============================================================ */
export const createTask = createAsyncThunk("tasks/createTask", async (payload: Partial<Task>, { rejectWithValue }) => {
    try {
        const response = await http.post("/task", payload);
        return response.data.data; // retorna task criada
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao criar tarefa");
    }
}
);

/* ============================================================
   GET /task/:id – Buscar task específica
============================================================ */
export const fetchTaskById = createAsyncThunk("tasks/fetchTaskById", async (id: string, { rejectWithValue }) => {
    try {
        const response = await http.get(`/task/${id}`);
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao buscar tarefa");
    }
}
);

/* ============================================================
   PUT /task/:id – Atualizar task
============================================================ */
export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, data }: { id: string; data: Partial<Task> }, { rejectWithValue }) => {
    try {
        const response = await http.put(`/task/${id}`, data);
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao atualizar tarefa");
    }
}
);

/* ============================================================
   DELETE /task/:id – Deletar task
============================================================ */
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string, { rejectWithValue }) => {
    try {
        await http.delete(`/task/${id}`);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao deletar tarefa");
    }
}
);

/* ============================================================
   Slice
============================================================ */
const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        clearSelectedTask(state) {
            state.selectedTask = null;
        }
    },
    extraReducers: (builder) => {
        builder
            /* Fetch all */
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            /* Create */
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })

            /* Fetch single */
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                state.selectedTask = action.payload;
            })

            /* Update */
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) state.tasks[index] = action.payload;
            })

            /* Delete */
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    },
});

export const { clearError, clearSelectedTask } = tasksSlice.actions;
export default tasksSlice.reducer;
