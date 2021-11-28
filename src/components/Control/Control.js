import React from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect} from 'react'
import { userActions } from '../../store/user-slice';
import { uiActions } from '../../store/ui-slice';

import sound from './NotifcationBeep'


const Control = () => {

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    const dispatch = useDispatch()
    const USERID = useSelector(state => state.user.id)
    const chats = useSelector(state => state.user.chats)
    const blocked = useSelector(state => state.user.blocked)
    const userNotifications = useSelector(state => state.user.notifications)
    const controlSocket = useSelector(state => state.ui.controlSocket)

    const [_contacts, setContacts] = useState([])

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/getcontacts`, requestOptions).then(val => val.json())
        .then((contacts) => {setContacts(contacts)})
    },[])

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: USERID
           })
        }

        controlSocket.on('lastseen', (obj) => {
                if(obj.author!==USERID) {

                      fetch(`${REACT_APP_API_URL}/getcontacts`, requestOptions).then(val => val.json())
                      .then((contacts) => {
                        const temp = contacts.filter(item => item.id === obj.author)
                        const everybodybutauthor = contacts.filter(item => {if(item.id !== obj.author) { return item}})

                        var contact = {...temp[0]}
                        const temp_1 = new Date()
                        const temp_2 = temp_1.setHours(temp_1.getHours()+2)
                        const time = new Date(temp_2)
                        var isostring = time
                
                        contact.last_seen = isostring

                        dispatch(userActions.updateContacts([...everybodybutauthor,contact]))
                      })

                }    
        })

     /**
     * This Section Resposible for Reciving Notifications .
     */


        const Beep = () => {
            sound.volume = 0.2;
            sound.play();  
        }

        
         controlSocket.on('friendrequest', (obj) => {

             if(!blocked.includes(obj.sender_id)) {
                 
                dispatch(uiActions.setnewNotifcation(true))
                dispatch(userActions.updateNotifications([...userNotifications,{
                    type: 'friend_request',
                    from_name: obj.sender_name,
                    from_id: obj.sender_id,
                    time: obj.time,
                    picture: obj.picture
                }]))
             }
             Beep()
         })
     
         /// When your friend request is being accepted
         controlSocket.on('acceptfriend', (obj) => {
     
             const chatsocket = io(`${REACT_APP_API_URL}`, {query:`chatid=${obj.chatid}`})
               
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
                 username: obj.username,
                 phone: obj.phone,
                 profile_picture: obj.profile_picture,
                 twitter: obj.twitter,
                 website: obj.website
             }
             console.log(newcontact)
             const newchat = {
                 id: obj.chatid,
                 owners: obj.owners,
                 content: [],
                 type: 'friend',
                 updatedAt: new Date().toString(),
                 socket: chatsocket
             }
     
             const newnotifcation = {
                 type: 'friend_accept',
                 from_name: `${obj.name+" "+obj.last_name}`,
                 from_id: obj.id,
                 time: new Date().toISOString(),
                 picture: obj.profile_picture
             }
     
             dispatch(userActions.updateContacts([..._contacts,newcontact]))
             dispatch(userActions.updateChat([...chats,newchat]))
             dispatch(userActions.updateNotifications([...userNotifications,newnotifcation]))
             dispatch(uiActions.setnewNotifcation(true))

             Beep()
             
         })
     
         //////////////////////////////////////////////////////////////////////////////////////////////////


    return <></>
}

export default Control