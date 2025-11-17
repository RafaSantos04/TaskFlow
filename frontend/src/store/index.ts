// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import user from './users/index';
import auth from './auth/index';
import task from './task/index';
import status from './status/index';

const store = configureStore({
    reducer: {
        user,
        auth,
        task,
        status,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;