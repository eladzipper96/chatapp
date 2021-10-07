import classes from './Chat.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';

const Chat = () => {
    
    return (
        <div className={classes.container}>
            <ChatRoom />
        </div>
       
    )       
}

export default Chat;