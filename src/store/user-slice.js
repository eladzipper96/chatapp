import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "ui",
    initialState: {
        id: '0',
        username: "moshe",
        name: "asdasd",
        last_name: "dgadg",
        phone: '',
        birthday: "03/06/1992",
        email: 'moshe@mail.com',
        website: "www.example.com",
        address: "Arlozerov 3, Tel Aviv",
        facebook: "@moshe_benzion_32",
        twitter: "@moshe91",
        instagram: "@moshe91",
        linkedin: "None",
        last_seen: "16:23",
        profile_picture: 'https://yt3.ggpht.com/ytc/AKedOLSZ_F0b39W8OIh3sd_65waSNdko3P2GKGIxgQE1nA=s900-c-k-c0x00ffffff-no-rj',
        contacts: [
            {
            id: '1',
            room: 'a',
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
            profile_picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/flower.png'
            },
            {
            id: '2',
            room: 'b',
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
            profile_picture: 'https://i.pinimg.com/originals/24/fe/b2/24feb2d6d872880800a31d80071c58fc.png'
            },
            {
            id: '3',
            room: 'c',
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
            profile_picture: 'https://i.pinimg.com/originals/17/64/f5/1764f598da749a1a100b391695e43865.png'
            }
    ],
        chats: [
            {
                chatid: 'a',
                contactid: '1',
                name: 'Zam Bibe',
                last_seen: '14:23PM',
            },
            {
                chatid: 'b',
                contactid: '2',
                name: 'Elad Zipper',
                last_seen: '11:23PM',
            },
            {
                chatid: 'c',
                contactid: '3',
                name: 'Tamir Bernstein',
                last_seen: '18:31AM',
            },
        ]
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
            state.twitter = action.payload.twitter
            state.last_seen = action.payload.last_seen
            state.contacts = action.payload.contacts
            state.profile_picture = action.payload.profile_picture
            state.chats = action.payload.chats
            //state.notifcations = action.payload.notifcations to active in future
        },
        updateChat(state, action) {
            state.chats = action.payload;
        }

    }
})
export const userActions = userSlice.actions
export default userSlice;