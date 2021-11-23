import classes from './Chat.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';
import ContactInfo from './ContactInfo/ContactInfo';
import UserInfoEdit from './UserInfoEdit/UserInfoEdit';
import LandingPage from './LandingPage/LandingPage';
import NewChat from './NewChat/NewChat'
import CreateGroup from './CreateGroup/CreateGroup';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import profilepicture from '../../assets/profilepicture.jpg'


const Chat = () => {
    
    const header = useSelector(state => state.ui.page)
    const selctedContact = useSelector(state => state.ui.SelectedContact)
    const chatId = useSelector(state => state.ui.chatId)
    const chats = useSelector(state => state.user.chats)
    const showChats = useSelector(state => state.ui.showChats)
    const showNewChat = useSelector(state =>state.ui.showNewChat)
    const showCreateGroup = useSelector(state => state.ui.showCreateGroup)
    const [ContactBool, setContactBool] = useState(false)
    const [socket, setSocket] = useState()

    const dispatch = useDispatch()
    //const socket = io('http://localhost:5000', {query:`chatid=${chatId}`})
    //var socket;
    useEffect(()=> {

            chats.forEach(chat => {
                if(chat.id === chatId) {
                setSocket(chat.socket)
                console.log("updated the socket")
                console.log(chat.socket)
                }
            }) 
        

        if(selctedContact !== "") {
            setContactBool(true)
        }
    },[ContactBool,selctedContact,chatId])

    const rooms = chats.map(chat => {
        return <ChatRoom key={chat.id} socket={chat.socket}/>
    })

    return (
        <div className={classes.container}>
            {(header === 'Chats' && !showChats) && <LandingPage />}
            {(header === 'Chats') && rooms}       
            {((header === 'Contacts') && ContactBool) && <ContactInfo />}
            {((header === 'Contacts') && !ContactBool) && <LandingPage />}
            {header === 'Profile' && <UserInfoEdit />}

            {(showNewChat || showCreateGroup) &&
            <div className={classes.actioncontainer}>
            {showNewChat && <NewChat />}
            {showCreateGroup && <CreateGroup />}
            </div>
            }

        </div>
       
    )       
}

export default Chat;

/** 
 * {(header === 'Chats' && socket !== undefined) && <ChatRoom socket={socket}/>}
*/