
import React from 'react'
import io from 'socket.io-client'
import { useSelector } from 'react-redux';

const ControlLastSeen = () => {

/**
 * This is ControlLastSeen Component, this component doesn't render anything
 * and it sole responsabilty is sending to online contacts that you are online.
 */


    const USERID = useSelector(state => state.user.id)
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    const LastSeenHandler = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: USERID
           })
        }

        setInterval(() => {

            // Updaing your information in the Database that you are online.

            fetch(`${REACT_APP_API_URL}/last_seen`, requestOptions).then()

            // Updaing your contacts that you are online by sending a request
            // to their personal Control Socket, after creating the sockets
            // and emitting lastseen, server terminate the socket.
            // Fetching the contacts (friends) list from the Database, in order to not
            // re-rendering the component by fetching the data with useSelector.

            fetch(`${REACT_APP_API_URL}/getcontacts`, requestOptions).then(val => val.json())
            .then(val => {

                // creating socket for each contact
                const sockets = val.map((contact) => {
                const tempsocket = io(`${REACT_APP_API_URL}`, {query:`chatid=${contact.id}`})
                return tempsocket
                })

                // emitting lastseen for each contact
                sockets.forEach((socket) => {
                socket.emit('lastseen', {author: USERID})
                })
            })
            },30000)
    }

    // Exection the code above
    LastSeenHandler()


    return <></>
}

export default ControlLastSeen