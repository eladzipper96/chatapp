import classes from './ChatItem.module.scss'
import location from '../../../assets/location.svg'

import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

const ChatItem = (props) => {

    const dispatch = useDispatch();
    const page = useSelector(state => state.ui.page)
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
            dispatch(uiActions.setContactPhoto(props.photo))
            setUnread(0)
        }
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
                <img src={location} alt="loc"/>
                {props.msg.substring(0,40)}
            </div>}
        </div>
    )
}

export default ChatItem