import classes from './Chat.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';
import ContactInfo from './ContactInfo/ContactInfo';
import UserInfoEdit from './UserInfoEdit/UserInfoEdit';
import LandingPage from './LandingPage/LandingPage';
import NewChat from './NewChat/NewChat'
import CreateGroup from './CreateGroup/CreateGroup';
import AddFriendChat from './AddFriendChat/AddFriendChat'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



const Chat = () => {
    
    const header = useSelector(state => state.ui.page)
    const selctedContact = useSelector(state => state.ui.SelectedContact)
    const chatId = useSelector(state => state.ui.chatId)
    const chats = useSelector(state => state.user.chats)
    const showChats = useSelector(state => state.ui.showChats)
    const showNewChat = useSelector(state =>state.ui.showNewChat)
    const showAddFriendChat = useSelector(state => state.ui.showAddFriendChat)
    const showCreateGroup = useSelector(state => state.ui.showCreateGroup)
    const [ContactBool, setContactBool] = useState(false)
    const [socket, setSocket] = useState()

    useEffect(()=> {

            chats.forEach(chat => {
                if(chat.id === chatId) {
                setSocket(chat.socket)
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

            {(showNewChat || showCreateGroup || showAddFriendChat) &&
            <div className={classes.actioncontainer}>
            {showNewChat && <NewChat />}
            {showCreateGroup && <CreateGroup />}
            {showAddFriendChat && <AddFriendChat />}
            </div>
            }

        </div>
       
    )       
}

export default Chat;

/** 
 * {(header === 'Chats' && socket !== undefined) && <ChatRoom socket={socket}/>}
*/