import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        page: "Chats",
        chatId: "",
    },
    reducers: {
        SetPage(state, action) {
            state.page = action.payload
        },
        setChatId(state, action) {
            state.chatId = action.payload
        }
    }
})
export const uiActions = uiSlice.actions
export default uiSlice;