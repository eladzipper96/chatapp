import React from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect} from 'react'
import { userActions } from '../../store/user-slice';
import { uiActions } from '../../store/ui-slice';

import sound from './NotifcationBeep'

/**
 * This is Control Component, this component doesn't render anything
 * and it sole responsabilty is listening to data sent to the user Control Socket
 * which is responsible receving and rendering new notifcations and last seen updates
 * from the user friends (while they are online)
 */

const Control = () => {

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    const dispatch = useDispatch()
    const USERID = useSelector(state => state.user.id)
    const chats = useSelector(state => state.user.chats)
    const blocked = useSelector(state => state.user.blocked)
    const userNotifications = useSelector(state => state.user.notifications)
    const controlSocket = useSelector(state => state.ui.controlSocket)

    const [_contacts, setContacts] = useState([])

    // Fetching the contacts (friends) list from the Database, in order to not
    // re-rendering the component by fetching the data with useSelector.

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

        // Last seen listener
        controlSocket.on('lastseen', (obj) => {
                if(obj.author!==USERID) {

                      // Fetching the contacts data from Database, same reason as useEffect.

                      fetch(`${REACT_APP_API_URL}/getcontacts`, requestOptions).then(val => val.json())
                      .then((contacts) => {
                        const temp = contacts.filter(item => item.id === obj.author)
                        const everybodybutauthor = contacts.filter(item => {if(item.id !== obj.author) { return item}})

                        // Copying the object recived from the server, due to read-only.
                        var contact = {...temp[0]}

                        // Setting the date String to be HH:MM structure.
                        const temp_1 = new Date()
                        const temp_2 = temp_1.setHours(temp_1.getHours()+2)
                        const time = new Date(temp_2)
                        var isostring = time
                        
                        // push the String into the object
                        contact.last_seen = isostring

                        // Updating the contacts with the new last seen.
                        dispatch(userActions.updateContacts([...everybodybutauthor,contact]))
                      })

                }    
        })

//-------------------------------------------------------------------------------
//This Section Resposible for Reciving Notifications .
//-------------------------------------------------------------------------------

        // Configuring and execution the Beep Sound
        const Beep = () => {
                sound.volume = 0.2;
                sound.play();  
        }

        // Friend request listener
         controlSocket.on('friendrequest', (obj) => {

            // Checking if sender isn't blocked
             if(!blocked.includes(obj.sender_id)) {
                 
                dispatch(uiActions.setnewNotifcation(true)) // Turns bell bold
                dispatch(userActions.updateNotifications([...userNotifications,{ // Pushing the notifcation
                    type: 'friend_request',
                    from_name: obj.sender_name,
                    from_id: obj.sender_id,
                    time: obj.time,
                    picture: obj.picture
                }]))
             }

             // runs a notifcation sound
             Beep()

         })
     
         /// When your friend request is being accepted
         controlSocket.on('acceptfriend', (obj) => {
            
            // Creating a socket for the new chat between user and friend
             const chatsocket = io(`${REACT_APP_API_URL}`, {query:`chatid=${obj.chatid}`})
            
             // Creating a contact object with the new friend information
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

             // creating a chat object with all the data required to function.
             const newchat = {
                 id: obj.chatid,
                 owners: obj.owners,
                 content: [],
                 type: 'friend',
                 updatedAt: new Date().toISOString(),
                 socket: chatsocket
             }

             // creating a notifcation object ('friend_accept') with the required data
             const newnotifcation = {
                 type: 'friend_accept',
                 from_name: `${obj.name+" "+obj.last_name}`,
                 from_id: obj.id,
                 time: new Date().toISOString(),
                 picture: obj.profile_picture
             }
     
             // pushing the new objects into the user State
             dispatch(userActions.updateContacts([..._contacts,newcontact]))
             dispatch(userActions.updateChat([...chats,newchat]))
             dispatch(userActions.updateNotifications([...userNotifications,newnotifcation]))
             dispatch(uiActions.setnewNotifcation(true))

             // runs a notifcation sound
             Beep()
             
         })
     
    return <></>
}

export default Control