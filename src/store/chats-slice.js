import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [
            {
            chatid: "a",
            messeages: [
                {
                author: '0',
                content: 'hello, how are you?',
                time: '11:12PM'
                },
                {
                author: '1',
                content: 'im fine, how are you?',
                time: '11:13PM'
                },
                {
                    author: '0',
                    content: 'doing pretty good',
                    time: '11:17PM'
                },
            ]
            },
            {
                chatid: "b",
                messeages: [
                    {
                    author: '0',
                    content: 'hi, are you ok??',
                    time: '13:52PM'
                    },
                    {
                    author: '2',
                    content: 'nah man, im feeling bad',
                    time: '14:12PM'
                    },
                ]
            },
            {
                chatid: "c",
                messeages: [
                    {
                    author: '0',
                    content: 'hi, are you ok??',
                    time: '18:22PM'
                    },
                    {
                    author: '3',
                    content: 'crap',
                    time: '19:12PM'
                    },
                ]
            }]
    },
    reducers: {
        setChats(state, action)  {
            state.chats = action.payload
        },
        updateChat(state,action) {
            const index = 0;
            state.chats[0].messeages = [...state.chats[0].messeages, action.payload]
        }
    }
    }
    )
export const uiActions = chatsSlice.actions
export default chatsSlice;