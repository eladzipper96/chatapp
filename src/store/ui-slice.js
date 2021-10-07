import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        page: "Chats",
    },
    reducers: {
        SetPage(state, action) {
            state.page = action.payload
        }
    }
})
export const uiActions = uiSlice.actions
export default uiSlice;