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

import Spinner from '../Spinner/Spinner'
/**
 * ChatList component is responsible for rendering both ChatList itself and
 * Contacts/UserInfo accord to the internal router state
 */


const ChatList = (props) => {

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    const [showDetails, setShowDetails] = useState(false)
    const [showAddFriend, setShowAddFriend] = useState(false)
    const [showNotifications, setShowNotifcations] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [selectOption, setSelectOption] = useState(['friend','group','unread'])
    const [friendUsername, setFriendUsername] = useState('')

    const [addFriendSpinner , setAddFriendSpinner] = useState(false)

    const newNotifcation = useSelector(state => state.ui.newNotifcation)

    const header = useSelector(state => state.ui.page)
    const chatId = useSelector(state => state.ui.chatId)

    const userinfo = useSelector(state => state.user)

    const USERID = userinfo.id
    const myUsername = userinfo.username
    const userName = userinfo.name+" "+userinfo.last_name
    const userPicture = userinfo.profile_picture

    const _contactlist = userinfo.contacts
    const _chats = userinfo.chats
    const activechats = userinfo.activechats
    const notifications = userinfo.notifications
   
    const now_time = new Date()
    const now_date = now_time.toISOString().substring(0,10)

    const dispatch = useDispatch()

    // Responsible of toggle preview the Add Friend window
    const addFriendHandler = () => {
        setShowAddFriend(val => !val)
        setShowDetails(false)
        setShowNotifcations(false)
    }

    // Responsible of toggle preview the Details (Options aka three dots) window
    const showDetailsHandler = () => {
        setShowDetails(val => !val)
        setShowAddFriend(false)
        setShowNotifcations(false)
    }

    // Responsible of toggle preview the notifcations window
    const showNotificationsHandler = () => {
        setShowNotifcations(val => !val)
        dispatch(uiActions.setnewNotifcation(false))
        setShowDetails(false)
        setShowAddFriend(false)
    }

    // Handle Rejecting Friend request on the notifcations window
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

        // filtering out the notifcations for deletion
        const arr = notifications.filter((not) => {
            return not.from_id !== obj.from_id
        })

        // updating the state and the Database after removal from Notifcations array
        dispatch(userActions.updateNotifications(arr))
        fetch(`${REACT_APP_API_URL}/notification`, requestOptions).then(console.log(''))
    }

    // Execute when the user accept a friend request.
    // User fetch information about the new contact, updating the server
    // about the acceptance, which in return sending the contact a notifcation
    // and the user information.

    const AcceptHandler = (obj) => {

        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                owners: [USERID,obj.from_id],
                accepted: USERID
           })
        }

        const DeleteNotifcationOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'remove',
                id: USERID,
                from_id: obj.from_id,
           })
        }

        // Creating new chat document on the Database
        fetch(`${REACT_APP_API_URL}/create_newchat`, Options).then(val => val.json())
        .then(val => {

            // new contact information recived from server
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
            // server returned the chat document id, creating a socket for the chat
            const socketforchat = io(`${REACT_APP_API_URL}`, {query:`chatid=${val.chatid}`})

            // chat object information fetched from server
            const chat = {
                id: val.chatid,
                owners: val.chatowners,
                content: [],
                type: 'friend',
                updatedAt: new Date(),
                socket: socketforchat
            }

            // updating the states with new objects
            dispatch(userActions.updateContacts([..._contactlist,contact]))
            dispatch(userActions.updateChat([..._chats,chat]))

            // creating a temp socket, in order to send the new contact
            // the user information and chat room information
            const tempsocket = io(`${REACT_APP_API_URL}`, {query:`chatid=${obj.from_id}`})

            // user emitting the information
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

        // removing the notifcation from the array state
        const arr = notifications.filter((not) => {
            return not.from_id !== obj.from_id
        })

        // removing the notifcation from the database
        fetch(`${REACT_APP_API_URL}/notification`, DeleteNotifcationOptions).then(console.log(''))

        // updating DOM
        dispatch(userActions.updateNotifications(arr))

    }

    // Handling the submition of a new friend request
    const submitAddFriend = () => {

        setAddFriendSpinner(true) // render to the DOM a loading spinner
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

        // Preventing user from adding himself
        if(friendUsername===myUsername) {
            setAddFriendSpinner(false)
            alert('You can\'t add yourself')
            return;
        }

        // Preventing user from adding a existing contact
        if(_contactlist.filter((con) => con.username === friendUsername).length > 0) {
            setAddFriendSpinner(false)
            alert(`${friendUsername} is already your friend`)
            return;
        }

        // case contact username input is legit
        if(friendUsername.length>0) {

            fetch(`${REACT_APP_API_URL}/addfriend`, requestOptions)
            .then(res => res.json())
            .then(res => {

                // case username exist
                if(res.status === 'true') {
                    const socket = io(`${REACT_APP_API_URL}`, {query:`chatid=${res.id}`})
                    socket.emit('friendrequest',{sender_id: USERID, sender_name: userName, time: date, picture: userPicture, username: friendUsername,})
                    setFriendUsername('')
                    setShowAddFriend(false)
                    setAddFriendSpinner(false)
                    alert('Friend Request Sent!')
                }

                // case username doesn't exist
                if(res.status === 'false') {
                    setAddFriendSpinner(false)
                    alert('This username doesn\'t exists, please try again')
                }
            })
        }
    }

    // Sorting the ChatList array by their last update
    // implements active chats shown on top by order
    const temparr = [..._chats]
    const sorted_arr = temparr.sort((a,b) => {
        var date_a = new Date(a.updatedAt)
        var date_b = new Date(b.updatedAt)
        return date_b.getTime() - date_a.getTime()
        
    })
    // -------------------------------------------------

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
                <option value={['friend','group']}>All Chats</option>
                <option value={['friend']}>Friends</option>
                <option value={['group']}>Groups</option>
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
                    {addFriendSpinner && <Spinner />}
                </div>
            )}

            {showNotifications && (
                <div className={classes.notificationscontainer}>
                    <span className={classes.notifcations_header}>Notifcations</span>
                    <img className={classes.notifcation_exit} src={close} alt='X' onClick={() => setShowNotifcations(false)}></img>
                    <div className={classes.notifcations_itemcontainer}>
                    {notifications.length===0 && 
                    <div className={classes.nonotification}>
                        <img src={bell} alt='No notifcations =['/>
                        <span>No Notifcations</span>
                    </div>}
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
                sorted_arr.map((item,index)=> {
                    if(activechats.includes(item.id) && selectOption.includes(item.type)) {

                    var length = item.content.length-1
                    var name = '';
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
                    }

                    if(item.type==='friend') {
                        if(item.owners[0] === USERID) {
                            contactid = item.owners[1]
                            _contactlist.forEach(val => {
                                if(item.owners[1] === val.id) {
                                    name = val.name+" "+val.last_name
                                    profile_picture = val.profile_picture
                                }
                            });
                        }

                        if(item.owners[1] === USERID) {
                            contactid = item.owners[0]
                            _contactlist.forEach(val => {
                                if(item.owners[0] === val.id) {
                                    name = val.name+" "+val.last_name
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