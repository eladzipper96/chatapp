import classes from './ChatItem.module.scss'
import megaphone from '../../../assets/megaphone.svg'

import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { userActions } from '../../../store/user-slice';

const ChatItem = (props) => {

    const dispatch = useDispatch();
    const page = useSelector(state => state.ui.page)
    const chats = useSelector(state => state.user.chats)
    const screenwidth = window.screen.width
    const [unread, setUnread] = useState(0)


    useEffect(()=> {
        if(props.unread) {
            setUnread(props.unread)
        }
    },[props.unread])

    const ClickHandler = () => {
        if(page==='Contacts') {
            dispatch(uiActions.setSelectedContact(props.id))
            dispatch(uiActions.setContactPhoto(props.photo))
        }

        if(page==='Chats') {
           
            dispatch(uiActions.setChatId(props.chatid))
            dispatch(uiActions.setContactName(props.name))
            dispatch(uiActions.setChatPhoto(props.photo))
            dispatch(uiActions.setContactId(props.contactid))
            dispatch(uiActions.setShowChats(true))
            setUnread(0)
            resetNewMessages()
        }
    }

    const resetNewMessages = () => {
        console.log("reseting the chat")
        const temp = chats.map(chat => {
            if(chat.id === props.chatid) {
                const arr = chat.content.map(msg => {
                    return {
                        ...msg,
                        read: true
                    }
                })
                return {
                    ...chat,
                    content: arr
                }
            }
            else return chat
        })

        dispatch(userActions.updateChat(temp))
    }

    return (
        <div className={classes.container} onClick={ClickHandler}>

            <div className={classes.image_container}>
                <img src={props.photo} alt="profile"></img>
            </div>

            <div className={classes.name}>{props.name}</div>
            <div className={classes.time}>{props.time}</div>

            {!props.contacts && <div className={classes.msg}>
                {props.msg.length>35 ? props.msg.substring(0,35)+"..." : props.msg.substring(0,35)}
            </div>}

            {unread!==0 && <div className={classes.unread}>{unread}</div>}

            {props.contacts &&
            <div className={classes.msg}>
                <img src={megaphone} alt="moto:"/>
                {screenwidth > 971 && <div>{props.msg.substring(0,40)}</div>}
                {(screenwidth < 971 && props.msg.length<22) && <div>{props.msg.substring(0,22)}</div>}
                {(screenwidth < 971 && props.msg.length>22) && <div>{props.msg.substring(0,22)+'...'}</div>}
            </div>}
        </div>
    )
}

export default ChatItem