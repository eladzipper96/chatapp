import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "ui",
    initialState: {
        username: "moshe",
        name: "Moshe Ben Zion",
        phone: '+972123123',
        birthday: "03/06/1992",
        email: 'moshe@mail.com',
        website: "www.example.com",
        address: "Arlozerov 3, Tel Aviv",
        facebook: "@moshe_benzion_32",
        twitter: "@moshe91",
        instagram: "@moshe91",
        linkedin: "None",
        last_seen: "16:23",
        profile_picture: undefined,
        contacts: [
            {
                id: '1',
                name: "Zam Bibe",
                phone: '+972-090909090',
                birthday: "03/01/1992",
                email: 'elad@mail.com',
                website: "www.example.com",
                address: "Tamoka 3, Tel Aviv",
                facebook: "@ez96",
                twitter: "@ez96",
                instagram: "@ez96",
                linkedin: "@elad_zipper",
                last_seen: "13:23",
                profile_picture: undefined
                },
            {
            id: '2',
            name: "Elad Zipper",
            phone: '+972-090909090',
            birthday: "03/01/1992",
            email: 'elad@mail.com',
            website: "www.example.com",
            address: "Tamoka 3, Tel Aviv",
            facebook: "@ez96",
            twitter: "@ez96",
            instagram: "@ez96",
            linkedin: "@elad_zipper",
            last_seen: "13:23",
            profile_picture: undefined
            },
            {
            id: '3',
            name: "Tamir Bernstein",
            phone: '+972-54245425',
            birthday: "03/01/1998",
            email: 'tamir@mail.com',
            website: "www.example.com",
            address: "Tamiros 3, Tel Aviv",
            facebook: "@asd22",
            twitter: "@asd22",
            instagram: "@asd22",
            linkedin: "@tamir",
            last_seen: "13:23",
            profile_picture: undefined
            }
    ],
    },
    reducers: {
        SetUser(state, action) {
            state = action.payload
        }
    }
})
export const userActions = userSlice.actions
export default userSlice;