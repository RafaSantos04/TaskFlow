import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '@api/http';


interface DataParams {
    id?: number;
    name: string;
    email: string;
    password: string;

}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await http.get('/users');
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (params: DataParams) => {
    const response = await http.post('/user', params);
    return response.data;
}
);
export const updateUser = createAsyncThunk('users/updateUser', async (params: DataParams) => {
    const response = await http.put(`/user/${params.id}`, params);
    return response.data;
}
);


const initialState = {
    users: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload.data;
        })
        
    },
    
});

export default userSlice.reducer;
