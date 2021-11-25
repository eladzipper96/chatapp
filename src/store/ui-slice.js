import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        page: "Chats", // acts as a router
        chatId: "a", // tells which chat to render
        ChatPhoto: '',
        contactName: 'NEED 2 DO!!!!',
        contactId: 0,
        contactPhoto: '',
        SelectedContact: "",// tells which contanct to display
        showChats: false,
        showNewChat: false,
        showCreateGroup: false,
        newNotifcation: false,
        controlSocket: undefined

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
        setContactId(state, action) {
            state.contactId = action.payload
        },
        setShowChats(state, action) {
            state.showChats = action.payload
        },
        setChatPhoto(state, action) {
            state.ChatPhoto = action.payload
        },
        setshowNewChat(state, action) {
            state.showNewChat = action.payload
        },
        setshowCreateGroup(state, action) {
            state.showCreateGroup = action.payload
        },
        setControlSocket(state, action) {
            state.controlSocket = action.payload
        },
        setnewNotifcation(state, action) {
            state.newNotifcation = action.payload
        },
        setreloadControl(state, action) {
            state.reloadControl = action.payload
        }

    }
})
export const uiActions = uiSlice.actions
export default uiSlice;