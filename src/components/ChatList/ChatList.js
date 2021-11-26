import classes from './ChatList.module.scss';
import dots from '../../assets/dots.svg'
import dots_black from '../../assets/dots_black.svg'
import bell from '../../assets/bell.svg'
import bellBlack from '../../assets/bell_black.svg'
import search from '../../assets/search.svg'
import addFriend from '../../assets/add_friend.svg'
import addFriendBlack from '../../assets/add_friend_black.svg'
import close from '../../assets/close.svg'
import ChatItem from './ChatItem/ChatItem';
import Contacts from './Contacts';
import UserInfo from './UserInfo'

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { uiActions } from '../../store/ui-slice';
import { userActions } from '../../store/user-slice';

import io from 'socket.io-client'


const ChatList = (props) => {

    const [showDetails, setShowDetails] = useState(false)
    const [showAddFriend, setShowAddFriend] = useState(false)
    const [showNotifications, setShowNotifcations] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [selectOption, setSelectOption] = useState(['friend','group','unread'])
    const [friendUsername, setFriendUsername] = useState('')
    const newNotifcation = useSelector(state => state.ui.newNotifcation)

    const header = useSelector(state => state.ui.page)
    const USERID = useSelector(state => state.user.id)
    const myUsername = useSelector(state => state.user.username)
    const userName = useSelector(state => state.user.name+" "+state.user.last_name)
    const userPicture = useSelector(state => state.user.profile_picture)
    const chatId = useSelector(state => state.ui.chatId)
    const _contactlist = useSelector(state => state.user.contacts)
    const _chats = useSelector(state => state.user.chats);
    const activechats = useSelector(state => state.user.activechats)
    const notifications = useSelector(state => state.user.notifications)

    const userinfo = useSelector(state => state.user)

    const now_time = new Date()
    const now_date = now_time.toISOString().substring(0,10)

    const dispatch = useDispatch()


    const addFriendHandler = () => {
        setShowAddFriend(val => !val)
        setShowDetails(false)
        setShowNotifcations(false)
    }
    
    const showDetailsHandler = () => {
        setShowDetails(val => !val)
        setShowAddFriend(false)
        setShowNotifcations(false)
    }

    const showNotificationsHandler = () => {
        setShowNotifcations(val => !val)
        dispatch(uiActions.setnewNotifcation(false))
        setShowDetails(false)
        setShowAddFriend(false)
    }

    const RejectHandler = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: USERID,
                type: 'remove',
                from_id: obj.from_id
           })
        }

        const arr = notifications.filter((not) => {
            return not.from_id !== obj.from_id
        })

        dispatch(userActions.updateNotifications(arr))
        fetch('http://localhost:5000/notification', requestOptions).then(console.log('removed notifcation'))
    }

    const AcceptHandler = (obj) => {

        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                owners: [USERID,obj.from_id],
                accepted: USERID
           })
        }

        fetch('http://localhost:5000/create_newchat', Options).then(val => val.json())
        .then(val => {
            const contact = {
                name: val.name,
                username: val.username,
                last_name: val.last_name,
                birthday: val.birthday,
                phone: val.phone,
                email: val.email,
                website: val.website,
                address: val.address,
                facebook: val.facebook,
                twitter: val.twitter,
                instagram: val.instagram,
                linkedin: val.linkedin,
                moto: val.moto,
                id: val.id,
                profile_picture: val.profile_picture,
                last_seen: val.last_seen
            }

            const socketforchat = io('http://localhost:5000', {query:`chatid=${val.chatid}`})

            const chat = {
                id: val.chatid,
                owners: val.chatowners,
                content: [],
                type: 'friend',
                socket: socketforchat
            }

            dispatch(userActions.updateContacts([..._contactlist,contact]))
            dispatch(userActions.updateChat([..._chats,chat]))

            const tempsocket = io('http://localhost:5000', {query:`chatid=${obj.from_id}`})

            tempsocket.emit('acceptfriend', {
                chatid: val.chatid,
                owners: val.chatowners,
                address: userinfo.address,
                username: userinfo.username,
                birthday: userinfo.birthday,
                email: userinfo.email,
                facebook: userinfo.facebook,
                id: userinfo.id,
                instagram: userinfo.instagram,
                last_name: userinfo.last_name,
                last_seen: userinfo.last_seen,
                linkedin: userinfo.linkedin,
                moto: userinfo.moto || 'no moto',
                name: userinfo.name,
                phone: userinfo.phone,
                profile_picture: userinfo.profile_picture,
                twitter: userinfo.twitter,
                website: userinfo.website
            })
        })

    }

    const submitAddFriend = () => {
        const date = new Date()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: friendUsername,
                sender_id: USERID,
                sender_name: userName,
                picture: userPicture,
                time: date,
           })
        }

        if(friendUsername===myUsername) {
            alert('You can\'t add yourself')
            return;
        }

        if(_contactlist.filter((con) => con.username === friendUsername).length > 0) {
            alert(`${friendUsername} is already your friend`)
            return;
        }

        if(friendUsername.length>0) {
            fetch('http://localhost:5000/addfriend', requestOptions)
            .then(res => res.json())
            .then(res => {
                if(res.status === 'true') {
                    const socket = io('http://localhost:5000', {query:`chatid=${res.id}`})
                    socket.emit('friendrequest',{sender_id: USERID, sender_name: userName, time: date, picture: userPicture})
                    setFriendUsername('')
                    setShowAddFriend(false)
                    alert('Friend Request Sent!')
                }
                if(res.status === 'false') {
                    alert('This username doesn\'t exists, please try again')
                }
            })
        }
    }


    return (
    <div className={classes.container}>

        <div className={classes.top}>
            <h3>{header}</h3>
            <div className={classes.icons}>
                <img src={showAddFriend ? addFriendBlack : addFriend} alt='add' onClick={addFriendHandler}></img>
                <img src={(showNotifications || newNotifcation) ? bellBlack : bell} alt="Notifcations" onClick={showNotificationsHandler}></img>
                <img src={showDetails ? dots_black : dots} alt="Details" onClick={showDetailsHandler}></img>
            </div>
            <div className={classes.select}>
            <select onChange={(e)=> setSelectOption(e.target.value.split(','))}>
                <option value={['friend','group','unread']}>All Chats</option>
                <option value={['friend']}>Friends</option>
                <option value={['group']}>Groups</option>
                <option value={['unread']}>Unread</option>
            </select>
            </div>

            <div className={classes.input}>
                <input type="text" onChange={(e)=> setSearchValue(e.target.value)}></input>
                <img src={search} alt="search"></img>
            </div>

            {showDetails && (
            <div className={classes.popup}>
            <ul>
                <li onClick={()=> {
                    dispatch(uiActions.setshowCreateGroup(false))
                    dispatch(uiActions.setshowNewChat(true))
                    setShowDetails(false)
                }}>New Chat</li>

                <li onClick={()=> {
                    dispatch(uiActions.setshowNewChat(false))
                    dispatch(uiActions.setshowCreateGroup(true))
                    setShowDetails(false)
                }}>Create Group</li>

                <li>Invite Others</li>
            </ul>
            </div>
            )}

            {showAddFriend && (
                <div className={classes.addfriend}>  
                    <div className={classes.addfriend_top}>
                        <span>Friend's username:</span>
                    </div>
                    <div className={classes.addfriend_bottom}>
                        <input type='text' value={friendUsername} onChange={(e)=> setFriendUsername(e.target.value)}></input>
                        <span onClick={submitAddFriend}>Send</span>
                    </div>
                </div>
            )}

            {showNotifications && (
                <div className={classes.notificationscontainer}>
                    <span className={classes.notifcations_header}>Notifcations</span>
                    <img className={classes.notifcation_exit} src={close} alt='X' onClick={() => setShowNotifcations(false)}></img>
                    <div className={classes.notifcations_itemcontainer}>
                    {notifications.length===0 && <div>There is no Notifciations</div>}
                    {notifications.slice(0).reverse().map((val,index) => {
                        if(val.type === 'friend_accept') {
                            return (
                                <div key={index} className={classes.notifcation_item}>
                                    <img src={val.picture} alt="face"></img>
                                    <div className={classes.notifcations_name}>
                                        <span>{val.from_name}</span>
                                        <span> Accepted your friend request</span>
                                    </div>
                                    {now_date === val.time.substring(0,10) &&
                                    <span>{`${val.time.substring(11,16)}`}</span>}
                                    {now_date !== val.time.substring(0,10) &&
                                    <span>{`${val.time.substring(11,16)}, ${val.time.substring(0,10)}`}</span>}
                                </div>
                            )
                        }
                        if(val.type === 'friend_request') {
                            return (<>
                                <div key={index} className={classes.notifcation_item}>
                                    <img src={val.picture} alt="face"></img>
                                    <div className={classes.notifcations_name}>
                                        <span>{val.from_name}</span>
                                        <span> Wants to be friends with you</span>
                                    </div>
                                    {now_date === val.time.substring(0,10) &&
                                    <span>{`${val.time.substring(11,16)}`}</span>}
                                    {now_date !== val.time.substring(0,10) &&
                                    <span>{`${val.time.substring(11,16)}, ${val.time.substring(0,10)}`}</span>}
                                </div>
                                <div className={classes.notifcations_buttons}>
                                    <span onClick={() => RejectHandler(val)}>Reject</span>
                                    <span onClick={() => AcceptHandler(val)}>Accept</span>
                                </div>
                                </>
                            )  
                        }
                    })}
                    </div>
                </div>
            )}

        </div>


        <div className={classes.main}>
            <div className={classes.chatlist}>
                {(header === '' || header === 'Chats') && 
                _chats.map((item,index)=> {
                    if(activechats.includes(item.id) && selectOption.includes(item.type)) {

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

                    if(item.type==='group') {
                        contactid = 'undefined'
                        name = item.name
                        profile_picture = item.picture
                        last_seen = '99:99'
                    }

                    if(item.type==='friend') {
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
                    }
                    if(name.toLowerCase().includes(searchValue.toLowerCase())) { // Handle Search
                        if(item.content.length===0) {
                            return <ChatItem key={name} 
                            name={name} time={""} 
                            msg={"Be the first to chat 😁"} 
                            chatid={item.id} photo={profile_picture} unread={unread} contactid={contactid}/> 
                        }
                        else {
                            if(item.type==='group') {
                                return <ChatItem key={name} 
                                name={name} time={item.content[length].time} 
                                msg={item.content[length].author===USERID ? `Me: ${item.content[length].value}` : `${item.content[length].authorname.split(' ')[0]}: ${item.content[length].value}`} 
                                chatid={item.id} photo={profile_picture} unread={unread} contactid={contactid}/>
                            }
                        return <ChatItem key={name} 
                        name={name} time={item.content[length].time} 
                        msg={item.content[length].author===USERID ? `Me: ${item.content[length].value}` : `${name.split(' ')[0]}: ${item.content[length].value}`} 
                        chatid={item.id} photo={profile_picture} unread={unread} contactid={contactid}/>
                        }
                    }                
                }
                }) }
            
                {header === 'Contacts' && <Contacts />}

                {header === 'Profile' && <UserInfo setLoggedIn={props.setLoggedIn} />}
            </div>
        </div>

        
    </div>)
    
}

export default ChatList;