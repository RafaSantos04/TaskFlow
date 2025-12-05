import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@api/http";
import type {
  Task,
  TasksState,
  CreateTaskDTO,
  UpdateTaskDTO
} from "@/types/task/index";

const initialState: TasksState = {
    tasks: [],
    selectedTask: null,
    loading: false,
    error: null
};

export const fetchTasks = createAsyncThunk(    "tasks/fetchTasks",    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get("/task");
            return response.data.data as Task[];
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erro ao buscar tarefas");
        }
    }
);

export const createTask = createAsyncThunk(    "tasks/createTask",    async (payload: CreateTaskDTO, { rejectWithValue }) => {
        try {
            const response = await http.post("/task", payload);
            return response.data.data as Task;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erro ao criar tarefa");
        }
    }
);

export const fetchTaskById = createAsyncThunk(    "tasks/fetchTaskById",    async (id: string, { rejectWithValue }) => {
        try {
            const response = await http.get(`/task/${id}`);
            return response.data.data as Task;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erro ao buscar tarefa");
        }
    }
);

export const updateTask = createAsyncThunk(    "tasks/updateTask",    async ({ id, data }: { id: string; data: UpdateTaskDTO }, { rejectWithValue }) => {
        try {
            const response = await http.put(`/task/${id}`, data);
            return response.data.data as Task;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erro ao atualizar tarefa");
        }
    }
);

export const deleteTask = createAsyncThunk(    "tasks/deleteTask",    async (id: string, { rejectWithValue }) => {
        try {
            await http.delete(`/task/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erro ao deletar tarefa");
        }
    }
);

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
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                state.selectedTask = action.payload;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) state.tasks[index] = action.payload;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });
    }
});

export const { clearError, clearSelectedTask } = tasksSlice.actions;
export default tasksSlice.reducer;
