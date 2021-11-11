import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import chatsSlice from "./chats-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        user: userSlice.reducer,
        chats: chatsSlice.reducer
    }
});

export default store;