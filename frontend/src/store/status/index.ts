import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "@api/http";

interface StatusState {
    items: any[];
    selectedStatus: any | null;
    loading: boolean;
    error: any | null;
}

const initialState: StatusState = {
    items: [],
    selectedStatus: null,
    loading: false,
    error: null,
};

// GET ALL
export const fetchStatus = createAsyncThunk(
    "status/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get("/status");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erro ao carregar status");
        }
    }
);

// GET BY ID
export const fetchStatusById = createAsyncThunk(
    "status/fetchOne",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await http.get(`/status/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erro ao carregar status");
        }
    }
);

// CREATE
export const createStatus = createAsyncThunk(
    "status/create",
    async (payload: { name: string; color: string; description?: string }, { rejectWithValue }) => {
        try {
            const response = await http.post("/status", payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erro ao criar status");
        }
    }
);

// UPDATE
export const updateStatus = createAsyncThunk(
    "status/update",
    async ({ id, ...payload }: any, { rejectWithValue }) => {
        try {
            const response = await http.put(`/status/${id}`, payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erro ao atualizar status");
        }
    }
);

// DELETE
export const deleteStatus = createAsyncThunk(
    "status/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await http.delete(`/status/${id}`);
            return id; // IMPORTANTE — retorna o ID deletado
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erro ao remover status");
        }
    }
);

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        clearSelectedStatus: (state) => {
            state.selectedStatus = null;
        },
        setSelectedStatus: (state, action) => {
            state.selectedStatus = action.payload;
        },
        updateStatusOrder(state, action) {
            state.items = action.payload;
        }
    },

    extraReducers: (builder) => {
        /** FETCH ALL */
        builder.addCase(fetchStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        /** FETCH ONE */
        builder.addCase(fetchStatusById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchStatusById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedStatus = action.payload;
        });
        builder.addCase(fetchStatusById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        /** CREATE */
        builder.addCase(createStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.items.push(action.payload);
        });
        builder.addCase(createStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        /** UPDATE */
        builder.addCase(updateStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateStatus.fulfilled, (state, action) => {
            state.loading = false;

            const index = state.items.findIndex((s) => s.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }

            state.selectedStatus = action.payload;
        });
        builder.addCase(updateStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        /** DELETE */
        builder.addCase(deleteStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter((s) => s.id !== action.payload);
            state.selectedStatus = null;
        });
        builder.addCase(deleteStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearSelectedStatus, setSelectedStatus, updateStatusOrder } = statusSlice.actions;
export default statusSlice.reducer;
