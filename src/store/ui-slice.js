import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        page: "Chats", // acts as a router
        chatId: "a", // tells which chat to render
        contactName: 'NEED 2 DO!!!!',
        contactPhoto: '',
        SelectedContact: "",// tells which contanct to display

    },
    reducers: {
        SetPage(state, action) {
            state.page = action.payload
        },
        setChatId(state, action) {
            state.chatId = action.payload
        },
        setSelectedContact(state, action) {
            state.SelectedContact = action.payload
        },
        setContactName(state, action) {
            state.contactName = action.payload
        },
        setContactPhoto(state, action) {
            state.contactPhoto = action.payload
        },

    }
})
export const uiActions = uiSlice.actions
export default uiSlice;