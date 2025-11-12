import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@api/http";

interface DataParams {
    email: string;
    password: string;
}

interface Menu {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    url: string;
    order: number;
    is_active: boolean;
}

interface Profile {
    id: number;
    name: string;
    slug: string;
    menus: Menu[];
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    profile_id: number;
    profile: Profile;
}

interface AuthState {
    user: User | null;
    token: string | null;
    tokenExpirationTime: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    tokenExpirationTime: null,
    loading: false,
    error: null,
};

export const authUser = createAsyncThunk(
    "auth/authUser",
    async (params: DataParams, { rejectWithValue }) => {
        try {
            const response = await http.post("/login", params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erro de conexão");
        }
    }
);


export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.post("/logout");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Erro ao realizar logout");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.tokenExpirationTime = null;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpirationTime");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token;
                state.user = action.payload.user;
                state.tokenExpirationTime = action.payload.token_expires_at;
                localStorage.setItem("id", action.payload.user.id);
                localStorage.setItem("token", action.payload.access_token);
                localStorage.setItem("tokenExpirationTime", action.payload.token_expires_at);
            })
            .addCase(authUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Erro ao autenticar usuário";
            });

        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.tokenExpirationTime = null;
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                localStorage.removeItem("tokenExpirationTime");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Erro ao realizar logout";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
