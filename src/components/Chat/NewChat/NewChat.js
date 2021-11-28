import classes from './NewChat.module.scss'
import close from '../../../assets/close.svg'
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { userActions } from '../../../store/user-slice';

const NewChat = () => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
    const userID = useSelector(state => state.user.id)
    const contacts = useSelector(state => state.user.contacts)
    const chats = useSelector(state => state.user.chats)
    const activeChats = useSelector(state => state.user.activechats)
    const temp = [...contacts] // this is copy the contacts array due to readonly.

    const sorted_contacts = temp.sort((a,b) => {
       return a.name.charCodeAt(0) - b.name.charCodeAt(0)
    })

    const clickHandler = (contact) => {
        chats.forEach(chat => {
            if(chat.owners.includes(contact.id)) {
                dispatch(uiActions.setChatId(chat.id))

                if(!activeChats.includes(chat.id)) {
                    dispatch(userActions.updateActiveChats([...activeChats,chat.id]))

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            type: 'add',
                            id: userID,
                            chatid: chat.id
                       })
                    }
            
                    fetch(`${REACT_APP_API_URL}/updateactivechats`, requestOptions).then(val => val.text())
                }
            }
        })

        dispatch(uiActions.setshowNewChat(false))
        dispatch(uiActions.setContactName(contact.name+" "+contact.last_name))
        dispatch(uiActions.setChatPhoto(contact.profile_picture))
        dispatch(uiActions.setContactId(contact.id))
        dispatch(uiActions.setShowChats(true))
        dispatch(uiActions.SetPage('Chats'))
    }

    return (
        <div className={classes.newchatcontainer}>
        <div className={classes.newchattop}>
            <h1>New Chat</h1>
            <img src={close} alt='X' onClick={()=> {dispatch(uiActions.setshowNewChat(false))}}></img>
            <h2>Please select a Friend to Chat with</h2>
        </div>
        <div className={classes.overflowcontainer}>
            {sorted_contacts.map(item => {
            return <div className={classes.item} onClick={()=> clickHandler(item)}>
                        <div className={classes.imagecontainer}>
                            <img src={item.profile_picture}></img>
                        </div>
                        <div className={classes.info}>
                            <span className={classes.name}>{item.name+" "+item.last_name}</span>
                            <span className={classes.moto}>{item.moto}</span>
                        </div>
                </div>
            })}
        </div>
    </div>
    )
}

export default NewChat