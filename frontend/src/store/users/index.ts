import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@api/http";

interface DataParams {
    id?: string;
    name: string;
    email: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
};

// ======================
// 🔹 Async Thunks
// ======================

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await http.get("/users");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao buscar usuários");
    }
});

export const gettingUser = createAsyncThunk("users/gettingUser", async (params: { id: string }, { rejectWithValue }) => {
    try {
        const response = await http.get(`/user/${params.id}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao buscar usuário");
    }
});

export const createUser = createAsyncThunk("users/createUser", async (params: DataParams, { rejectWithValue }) => {
    try {
        const response = await http.post("/user", params);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao criar usuário");
    }
});

export const updateUser = createAsyncThunk("users/updateUser", async (params: DataParams, { rejectWithValue }) => {
    try {
        const response = await http.put(`/user/${params.id}`, params);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erro ao atualizar usuário");
    }
});

// ======================
// 🔹 Slice
// ======================

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // ======== FETCH USERS ========
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // ======== GET SINGLE USER ========
        builder
            .addCase(gettingUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(gettingUser.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload.data;
            })
            .addCase(gettingUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // ======== CREATE USER ========
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.data);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // ======== UPDATE USER ========
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload.data;
                state.users = state.users.map((user) => (user.id === updated.id ? updated : user));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
