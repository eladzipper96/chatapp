import classes from './CreateGroup.module.scss'
import close from '../../../assets/close.svg'
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { useState } from 'react';


const CreateGroup = () => {

    const dispatch = useDispatch()
    const contacts = useSelector(state => state.user.contacts)
    const userID = useSelector(state => state.user.id)
    const userName = useSelector(state => state.user.name+" "+state.user.last_name)
    const chats = useSelector(state => state.user.chats)
    const activeChats = useSelector(state => state.user.activechats)
    const temp = [...contacts] // this is copy the contacts array due to readonly.

    const [groupMembers, setGroupMembers] = useState([userID])
    const [groupName, setGroupName] = useState('')

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL


    const sorted_contacts = temp.sort((a,b) => {
       return a.name.charCodeAt(0) - b.name.charCodeAt(0)
    })

    const selectHandler = (id) => {
        if(groupMembers.includes(id)) {
            var temparr = [...groupMembers]
            temparr.splice(temparr.indexOf(id), 1)
            setGroupMembers(temparr)
        }
        else {
            setGroupMembers(val => [...val,id])
        }
    }

    const SumbitHandler = async () => {
        if(groupMembers.length>1 && groupName.length>0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    owners: groupMembers,
                    name: groupName
               })
            }
    
            fetch(`${REACT_APP_API_URL}/addnewgroup`, requestOptions)
            .then(res =>{
                return res.text()
            })
            .then(res => {
                chats.forEach(chat => {
                    if(chat.type==='friend') {
                        if(groupMembers.includes(chat.owners[0]) && groupMembers.includes(chat.owners[1])) {
                            chat.socket.emit('newgroup', {contect: [],id: res, owners: groupMembers, type: 'group', name: groupName})
                        }
                    }
                })
            })
            
                //dispatch(userActions.updateChat(
                    //[...chats,
                    //{id: res, owners: groupMembers, type:'group', content: [], name: `${userName}'s Group`}]))
               // dispatch(userActions.updateActiveChats([...activeChats,res]))

            dispatch(uiActions.setshowCreateGroup(false))
        }

    }

    return (
        <div className={classes.newchatcontainer}>
        <div className={classes.newchattop}>
            <h1>Create Group</h1>
            <img src={close} alt='X' onClick={()=> dispatch(uiActions.setshowCreateGroup(false))}></img>
            <h2>Please select two or more friends to chat with</h2>
            <div className={classes.groupname}>
                <label htmlFor='group_name'>Group's Name:</label>
                <input type="text" name="group_name" id="group_name" required onChange={(e) => {
                    setGroupName(e.target.value)
                }} value={groupName}></input>
            </div>
        </div>
        <div className={classes.overflowcontainer}>
            {sorted_contacts.map(item => {
            return (
            <label htmlFor={item.id} key={item.id}>
            <input className={classes.checkbox} type="checkbox" id={item.id} name={item.id}></input>    
            <div className={classes.item} onClick={()=> selectHandler(item.id)}>
                        <div className={classes.imagecontainer}>
                            <img src={item.profile_picture}></img>
                        </div>
                        <div className={classes.info}>
                            <span className={classes.name}>{item.name+" "+item.last_name}</span>
                            <span className={classes.moto}>{item.moto}</span>
                        </div>
                </div>
                </label>
                )
            })}
        </div>
        <div className={classes.button} onClick={SumbitHandler}>Start Chatting!</div>
    </div>
    )

}

export default CreateGroup