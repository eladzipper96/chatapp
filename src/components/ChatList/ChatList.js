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
import { useState, useEffect } from 'react';


const ChatList = (props) => {

    const [showDetails, setShowDetails] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const header = useSelector(state => state.ui.page)
    const USERID = useSelector(state => state.user.id)
    const chatId = useSelector(state => state.ui.chatId)
    const _contactlist = useSelector(state => state.user.contacts)
    const _chats = useSelector(state => state.user.chats);



    return (
    <div className={classes.container}>

        <div className={classes.top}>
            <h3>{header}</h3>
            <div className={classes.icons}>
                <img src={addFriend} alt='add'></img>
                <img src={bell} alt="Notifcations" ></img>
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
                <input type="text" onChange={(e)=> setSearchValue(e.target.value)}></input>
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
                _chats.map((item,index)=> {
                    var length = item.content.length-1
                    var name;
                    var last_seen;
                    var profile_picture;
                    var contactid;
                    var unread = 0;
                    item.content.forEach(val => {
                        if(val.read === false) {
                            if(val.author !== USERID && chatId !== item.id) {
                                unread++
                            }
                        }
                    })

                    if(item.owners[0] === USERID) {
                        contactid = item.owners[1]
                        _contactlist.forEach(val => {
                            if(item.owners[1] === val.id) {
                                name = val.name+" "+val.last_name
                                last_seen = val.last_seen
                                profile_picture = val.profile_picture
                            }
                        });
                    }

                    if(item.owners[1] === USERID) {
                        contactid = item.owners[0]
                        _contactlist.forEach(val => {
                            if(item.owners[0] === val.id) {
                                name = val.name+" "+val.last_name
                                last_seen = val.last_seen
                                profile_picture = val.profile_picture
                            }
                        });
                    }
                    console.log(unread)
                    if(name.toLowerCase().includes(searchValue.toLowerCase())) { // Handle Search
                        return <ChatItem key={name} 
                        name={name} time={item.content[length].time} 
                        msg={item.content[length].author===USERID ? `Me: ${item.content[length].value}` : `${name.split(' ')[0]}: ${item.content[length].value}`} 
                        chatid={item.id} photo={profile_picture} unread={unread} contactid={contactid}/>
                    }

                }) }
            
                {header === 'Contacts' && <Contacts />}

                {header === 'Profile' && <UserInfo setLoggedIn={props.setLoggedIn} />}
            </div>
        </div>

        
    </div>)
    
}

export default ChatList;