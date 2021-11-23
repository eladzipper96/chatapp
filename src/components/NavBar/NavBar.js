import classes from './NavBar.module.scss';
import icon from '../../assets/chaticon.svg'
import chat from '../../assets/chaticon_nav.svg'
import friends from '../../assets/friends.svg'
import profile from '../../assets/profile.svg'
import io from 'socket.io-client'

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user-slice';
import { uiActions } from '../../store/ui-slice';

const NavBar = () => {
    

    const dispatch = useDispatch()

    /**
     * This Sections is not related to NavBar itself, but takes advantage of it always rendering once.
     * This logic is resposible for reciveing notifcations from other users.
     */
    const USERID = useSelector(state => state.user.id)
    const chats = useSelector(state => state.user.chats)
    const contacts = useSelector(state => state.user.contacts)
    const userNotifications = useSelector(state => state.user.notifications)
    const socket = io('http://localhost:5000', {query:`chatid=${USERID}`})

    socket.on('friendrequest', (obj) => {
        dispatch(uiActions.setnewNotifcation(true))
        dispatch(userActions.updateNotifications([...userNotifications,{
            type: 'friend_request',
            from_name: obj.sender_name,
            from_id: obj.sender_id,
            time: obj.time,
            picture: obj.picture
        }]))
    })

    /// When your friend request is being accepted
    socket.on('acceptfriend', (obj) => {

        console.log("this is the obj im getting after my friend request accpted")
        console.log(obj)

        const chatsocket = io('http://localhost:5000', {query:`chatid=${obj.chatid}`})

        const newcontact = {
            address: obj.address,
            birthday: obj.birthday,
            email: obj.email,
            facebook: obj.facebook,
            id: obj.id,
            instagram: obj.instagram,
            last_name: obj.last_name,
            last_seen: obj.last_seen,
            linkedin: obj.linkedin,
            moto: obj.moto,
            name: obj.name,
            phone: obj.phone,
            profile_picture: obj.profile_picture,
            twitter: obj.twitter,
            website: obj.website
        }

        const newchat = {
            id: obj.chatid,
            owners: obj.owners,
            content: [],
            type: 'friend',
            socket: chatsocket
        }

        const newnotifcation = {
            type: 'friend_accept',
            from_name: `${obj.name+" "+obj.last_name}`,
            from_id: obj.id,
            time: new Date().toISOString(),
            picture: obj.profile_picture
        }

        dispatch(userActions.updateContacts([...contacts,newcontact]))
        dispatch(userActions.updateChat([...chats,newchat]))
        dispatch(userActions.updateNotifications([...userNotifications,newnotifcation]))
        dispatch(uiActions.setnewNotifcation(true))
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////


    return (
    <div className={classes.main}>

        <div className={classes.logo_container}>
            <img className={classes.logo} src={icon} alt="Icon"></img>
        </div>

        <div className={classes.nav}>
            <div className={classes.icon_container}>
                <img src={chat} alt="chat" onClick={() => dispatch(uiActions.SetPage("Chats"))}></img>
            </div>

            <div className={classes.icon_container}>
            <img src={friends} alt="contacts" onClick={() => dispatch(uiActions.SetPage("Contacts"))}></img>
            </div>

            <div className={classes.icon_container}>
            <img src={profile} alt="profile" onClick={() => dispatch(uiActions.SetPage("Profile"))}></img>
            </div>
        </div>
    </div>)
    
}

export default NavBar;