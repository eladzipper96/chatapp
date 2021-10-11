import classes from './Chat.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';
import ContactInfo from './ContactInfo/ContactInfo';

import { useSelector } from 'react-redux';

const Chat = () => {
    
    const header = useSelector(state => state.ui.page)

    return (
        <div className={classes.container}>
            
            {header === 'Chats' && <ChatRoom />}
            {header === 'Contacts' && <ContactInfo />}
        </div>
       
    )       
}

export default Chat;