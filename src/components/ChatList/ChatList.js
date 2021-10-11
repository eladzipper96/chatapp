import classes from './ChatList.module.scss';
import dots from '../../assets/dots.svg'
import dots_black from '../../assets/dots_black.svg'
import bell from '../../assets/bell.svg'
import search from '../../assets/search.svg'
import addFriend from '../../assets/add_friend.svg'

import ChatItem from './ChatItem/ChatItem';
import Contacts from './Contacts';
import UserInfo from './UserInfo'

import { useSelector } from 'react-redux';
import { useState } from 'react';


const ChatList = () => {

    const [showDetails, setShowDetails] = useState(false)
    const header = useSelector(state => state.ui.page)

    const tempchats = [
        {
        name: "Jonah Steinberg",
        last_seen: '15:23PM',
        last_msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis.",
        id: "1"
        },
        {
        name: "Jospeh Kaizner",
        last_seen: '19:32AM',
        last_msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis, lectus non.",
        id: "2"
        },
        {
        name: "Amit Melinovski",
        last_seen: "16:23PM",
        last_msg: "Lorem ipsum dolor sit amet, consectetur.",
        id: "3"
        }
    ]

    return (
    <div className={classes.container}>

        <div className={classes.top}>
            <h3>{header}</h3>
            <div className={classes.icons}>
                <img src={addFriend} alt='add'></img>
                <img src={bell} alt="Notifcations"></img>
                <img src={showDetails ? dots_black : dots} alt="Details" onClick={() => setShowDetails(val => !val)}></img>
            </div>
            <div className={classes.select}>
            <select >
                <option>All Chats</option>
                <option>Friends</option>
                <option>Groups</option>
                <option>Unread</option>
            </select>
            </div>

            <div className={classes.input}>
                <input type="text"></input>
                <img src={search} alt="search"></img>
            </div>

            {showDetails && (
            <div className={classes.popup}>
            <ul>
                <li>New Chat</li>
                <li>Create Group</li>
                <li>Invite Others</li>
            </ul>
            </div>
            )}

        </div>

        <div className={classes.main}>
            <div className={classes.chatlist}>
                {(header === '' || header === 'Chats') && 
                tempchats.map(item => <ChatItem name={item.name} time={item.last_seen} msg={item.last_msg} />) }
            
                {header === 'Contacts' && <Contacts />}

                {header === 'Profile' && <UserInfo />}
            </div>
        </div>

        
    </div>)
    
}

export default ChatList;