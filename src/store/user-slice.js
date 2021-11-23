import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "ui",
    initialState: {
        id: '0',
        username: "",
        name: "",
        last_name: "",
        moto: "",
        phone: '',
        birthday: "",
        email: '',
        website: "",
        address: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        last_seen: "",
        profile_picture: '',
        contacts: [],
        chats: [],
        activechats: [],
        notifications: []
        },
    reducers: {
        SetUser(state, action) {
            console.log(action.payload)
            state.id = action.payload._id || action.payload.id
            state.name = action.payload.name
            state.last_name = action.payload.last_name
            state.phone = action.payload.phone
            state.birthday = action.payload.birthday
            state.email = action.payload.email
            state.website = action.payload.website
            state.address = action.payload.address
            state.facebook = action.payload.facebook
            state.instagram = action.payload.instagram
            state.linkedin = action.payload.linkedin
            state.moto = action.payload.moto
            state.twitter = action.payload.twitter
            state.last_seen = action.payload.last_seen
            state.contacts = action.payload.contacts
            state.profile_picture = action.payload.profile_picture
            state.chats = action.payload.chats
            state.activechats = action.payload.activechats
            state.notifications = action.payload.notifications
        },
        updateChat(state, action) {
            console.log(action.payload)
            state.chats = action.payload;
        },
        updateActiveChats(state, action) {
            console.log(action.payload)
            state.activechats = action.payload
        },
        updateNotifications(state, action) {
            state.notifications = action.payload
        },
        updateContacts (state, action) {
            state.contacts = action.payload
        }


    }
})
export const userActions = userSlice.actions
export default userSlice;