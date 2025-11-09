// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
// import user from './user/index';
// import auth from './auth/index';
// import menu from './menu/index';

const store = configureStore({
    reducer: {
        // user,
        // auth,
        // menu,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;