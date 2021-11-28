
import React from 'react'
import io from 'socket.io-client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ControlLastSeen = () => {


    const USERID = useSelector(state => state.user.id)
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    const somethingHandler = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: USERID
           })
        }


        setInterval(() => {
            fetch(`${REACT_APP_API_URL}/last_seen`, requestOptions).then( )

            fetch(`${REACT_APP_API_URL}/getcontacts`, requestOptions).then(val => val.json())
            .then(val => {
                const sockets = val.map((contact) => {
                const tempsocket = io(`${REACT_APP_API_URL}`, {query:`chatid=${contact.id}`})
                return tempsocket
                })

                sockets.forEach((socket) => {
                socket.emit('lastseen', {author: USERID})
                })

            })
            },30000)



    }

    somethingHandler()


    return <></>

}


export default ControlLastSeen