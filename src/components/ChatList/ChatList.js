import classes from './ChatList.module.scss';
import dots from '../../assets/dots.svg'
import dots_black from '../../assets/dots_black.svg'
import bell from '../../assets/bell.svg'
import search from '../../assets/search.svg'

import { useSelector } from 'react-redux';
import { useState } from 'react';


const ChatList = () => {

    const [showDetails, setShowDetails] = useState(false)
    const header = useSelector(state => state.ui.page)

    return (
    <div className={classes.container}>

        <div className={classes.top}>
            <h3>{header}</h3>
            <div className={classes.icons}>
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

        </div>
    </div>)
    
}

export default ChatList;