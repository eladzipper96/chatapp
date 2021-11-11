import classes from './Chat.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';
import ContactInfo from './ContactInfo/ContactInfo';
import UserInfoEdit from './UserInfoEdit/UserInfoEdit';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Chat = () => {
    
    const header = useSelector(state => state.ui.page)
    const selctedContact = useSelector(state => state.ui.SelectedContact)
    const chatId = useSelector(state => state.ui.chatId)
    const [ContactBool, setContactBool] = useState(false)


    const socket = io('http://localhost:5000', {query:`chatid=${chatId}`})


    useEffect(()=> {
        if(selctedContact !== "") {
            setContactBool(true)
        }
    },[ContactBool,selctedContact])

    return (
        <div className={classes.container}>
            
            {header === 'Chats' && <ChatRoom socket={socket}/>}
            {((header === 'Contacts') && ContactBool) && <ContactInfo />}
            {((header === 'Contacts') && !ContactBool) && <div>Temp, please select user</div>}
            {header === 'Profile' && <UserInfoEdit />}
        </div>
       
    )       
}

export default Chat;

/** */