
import React from 'react'
import io from 'socket.io-client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ControlLastSeen = () => {

    console.log('control lastseen rendered')

    const USERID = useSelector(state => state.user.id)
    
    var contacts

    const somethingHandler = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: USERID
           })
        }

        const step_1 = await fetch('http://localhost:5000/getcontacts', requestOptions)
        const step_2 = await step_1.json()
        const final = await step_2
        contacts = final;

        const sockets = final.map((contact) => {
            const tempsocket = io('http://localhost:5000', {query:`chatid=${contact.id}`})
            return tempsocket
        })

        setInterval(() => {
            fetch('http://localhost:5000/last_seen', requestOptions).then( console.log('updated lastseen'))
            console.log('sent interval')
            sockets.forEach((socket) => {
                socket.emit('lastseen', {author: USERID})
           })
        },30000)



    }

    somethingHandler()


    return <></>

}


export default ControlLastSeen