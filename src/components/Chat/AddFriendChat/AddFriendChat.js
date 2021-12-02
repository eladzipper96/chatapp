import classes from './AddFriendChat.module.scss'
import close from '../../../assets/close.svg'
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { userActions } from '../../../store/user-slice';

const AddFriendChat = () => {
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.user.contacts)
    const chats = useSelector(state => state.user.chats)
    const chatId = useSelector(state => state.ui.chatId)
    const temp = [...contacts] // this is copy the contacts array due to readonly.

    const sorted_contacts = temp.sort((a,b) => {
       return a.name.charCodeAt(0) - b.name.charCodeAt(0)
    })

    const owners = chats.filter((chat) => {
        if(chat.id === chatId) return chat
    })

    const finalarray = sorted_contacts.filter(con => {
        if(!owners[0].owners.includes(con.id)) return con
    })

    const clickHandler = (contact) => {
         const newchats = chats.map((chat) => {
             if(chat.id===chatId) {
                 return {
                     ...chat,
                     owners: [...chat.owners,contact.id]
                 }
             }
             else {
                 return chat
             }
         }) 

         dispatch(userActions.updateChat(newchats))
         dispatch(uiActions.setshowAddFriendChat(false))

    }

    return (
        <div className={classes.newchatcontainer}>
        <div className={classes.newchattop}>
            <h1>Add a Friend to Group</h1>
            <img src={close} alt='X' onClick={()=> {dispatch(uiActions.setshowAddFriendChat(false))}}></img>
            <h2>Please select a Friend to Add</h2>
        </div>
        <div className={classes.overflowcontainer}>
            {finalarray.map(item => {
            return <div className={classes.item} onClick={()=> clickHandler(item)}>
                        <div className={classes.imagecontainer}>
                            <img src={item.profile_picture} alt='profilepic'></img>
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

export default AddFriendChat