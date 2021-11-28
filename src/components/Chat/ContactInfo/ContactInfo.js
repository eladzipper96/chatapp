import classes from './ContactInfo.module.scss'

import block from '../../../assets/block_white.svg'
import unblock from '../../../assets/unblock.svg'
import sendmsg from '../../../assets/sendmsg.svg'
import time from '../../../assets/time.svg'
import date from '../../../assets/date.svg'
import phone from '../../../assets/phone.svg'
import email from '../../../assets/email.svg'
import website from '../../../assets/website.svg'
import house from '../../../assets/house.svg'
import facebook from '../../../assets/facebook.svg'
import twitter from '../../../assets/twitter.svg'
import instagram from '../../../assets/instagram.svg'
import linkedin from '../../../assets/linkedin.svg'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uiActions } from '../../../store/ui-slice'
import { userActions } from '../../../store/user-slice'

const ContactInfo = () => {

    const dispatch = useDispatch();
    const userID = useSelector(state => state.user.id)
    const selected_id = useSelector(state => state.ui.SelectedContact)
    const contacts_array = useSelector(state => state.user.contacts)
    const chats_array = useSelector(state => state.user.chats)
    const blocked_array = useSelector(state => state.user.blocked)
    const activeChats = useSelector(state => state.user.activechats)
    const [blocked, setBlocked] = useState(false)

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        if(blocked_array.includes(selected_id)) {
            setBlocked(true)
         }
        else {
            setBlocked(false)
        }
    },[blocked_array,selected_id])

    var contact = {}
    var chatid = 1

    const temp = contacts_array.filter(item => item.id === selected_id)
   contact = temp[0];

    const temp_2 = chats_array.filter(item => item.owners.includes(contact.id))
    chatid = temp_2[0].id


    const msgButtonHandler = () => {

        if(!activeChats.includes(chatid)) 
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'add',
                    id: userID,
                    chatid: chatid
               })
            }
    
            fetch(`${REACT_APP_API_URL}/updateactivechats`, requestOptions).then(val => val.text())

            dispatch(userActions.updateActiveChats([chatid,...activeChats]))

        }
        dispatch(uiActions.SetPage('Chats'))
        dispatch(uiActions.setContactId(contact.id))
        dispatch(uiActions.setContactName(contact.name+" "+contact.last_name))
        dispatch(uiActions.setContactPhoto(contact.profile_picture))
        dispatch(uiActions.setChatPhoto(contact.profile_picture))
        dispatch(uiActions.setChatId(chatid))
        dispatch(uiActions.setShowChats(true))


    }

    const blockHandler = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'block',
                id: userID,
                toblock: selected_id,
                chatid: chatid
           })
        }

        fetch(`${REACT_APP_API_URL}/block`, requestOptions).then(val => val.text())
        const newactivechats = activeChats.filter(val => val !== chatid)
        dispatch(userActions.updateActiveChats(newactivechats))
        dispatch(userActions.updateBlocked([...blocked_array,selected_id]))
        setBlocked(true)
    }

    const unBlockHandler = () => {

            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'unblock',
                id: userID,
                tounblock: selected_id,
                chatid: chatid
           })
        }
        
        fetch(`${REACT_APP_API_URL}/block`, requestOptions).then(val => val.text())

        const newblocked = blocked_array.filter(val => val !== selected_id)
        dispatch(userActions.updateBlocked(newblocked))
        dispatch(userActions.updateActiveChats([...activeChats,chatid]))
        setBlocked(false)

    }

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <img className={classes.photo} src={contact.profile_picture} alt='profile'></img>
                <div className={classes.name}>{contact.name+" "+contact.last_name}</div>
                {!blocked && (
                <div className={classes.icons}>
                    <div className={[classes.sendmsg,classes.block].join(' ')} onClick={blockHandler}>
                        <img src={block} alt='block' ></img>
                    </div>
                    <div className={classes.sendmsg} onClick={msgButtonHandler}>
                        <img src={sendmsg} alt='send message' ></img>
                    </div>
                </div>
                )}
                {blocked && (
                <div className={classes.icons}>
                    <div className={[classes.sendmsg,classes.unblock].join(' ')} onClick={unBlockHandler}>
                        <img src={unblock} alt='unblock' ></img>
                    </div>
                    <div className={[classes.sendmsg,classes.blockedmsg].join(' ')} >
                        <img src={sendmsg} alt='send message' ></img>
                    </div>
                </div>
                )}
                
            </div>

            <div className={classes.scroll}>           

            <div className={classes.info}>
                <div className={classes.item}>
                    <div className={classes.subject}>Local Time</div>
                    <div className={classes.value}>13:23 PM</div>
                    <img className={classes.icon} src={time} alt="time"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Birth Date</div>
                    <div className={classes.value}>{contact.birthday.substring(0,10)}</div>
                    <img className={classes.icon} src={date} alt="date"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Phone Number</div>
                    <div className={classes.value}>{contact.phone}</div>
                    <img className={classes.icon} src={phone} alt="phone"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Email</div>
                    <div className={classes.value}>{contact.email}</div>
                    <img className={classes.icon} src={email} alt="email"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Website</div>
                    <div className={classes.value}>{contact.website}</div>
                    <img className={classes.icon} src={website} alt="website"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Address</div>
                    <div className={classes.value}>{contact.address}</div>
                    <img className={classes.icon} src={house} alt="address"></img>
                </div>

            </div>

            <div className={classes.info}>
                <div className={classes.item}>
                        <div className={classes.subject}>Facebook</div>
                        <div className={classes.value}>{contact.facebook}</div>
                        <img className={classes.icon} src={facebook} alt="facebook"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Twitter</div>
                        <div className={classes.value}>{contact.twitter}</div>
                        <img className={classes.icon} src={twitter} alt="twitter"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Instagram</div>
                        <div className={classes.value}>{contact.instagram}</div>
                        <img className={classes.icon} src={instagram} alt="instagram"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Linkedin</div>
                        <div className={classes.value}>{contact.linkedin}</div>
                        <img className={classes.icon} src={linkedin} alt="linkedin"></img>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ContactInfo;