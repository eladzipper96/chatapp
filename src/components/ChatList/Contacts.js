import classes from './Contacts.module.scss'
import ChatItem from "./ChatItem/ChatItem";

import { useSelector } from 'react-redux';

/**
 * Render to the screen a list of ChatItem (Card component) with the contacts information
 * and a flag to ChatItem component
 */

const Contacts = () => {  

    // Sorting the array by the ASCII Code of the first letter in contact first name.

    const firstlist = useSelector(state => state.user.contacts)
    const secondlist = [...firstlist] // due to readonly array
    const FinalList = secondlist.sort((a,b) => {
        return a.name.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0)
    })


    return (
        <div>
            {FinalList.map((item,index) => {

                // contacts={true} prop lets ChatItem know how to render
                // the component for Contacts and not to ChatList

                if(index===0) { 
                    return (
                        <>
                        <div className={classes.letter}>{item.name.substring(0,1).toUpperCase()}</div>
                        <ChatItem key={item.name} name={item.name+" "+item.last_name} time=' ' msg={item.moto} contacts={true} id={item.id} photo={item.profile_picture}></ChatItem>
                        </>
                    )  
                }
                if(item.name.charCodeAt(0) !== FinalList[index-1].name.charCodeAt(0)) {
                    return (
                        <>
                        <div className={classes.letter}>{item.name.substring(0,1).toUpperCase()}</div>
                        <ChatItem key={item.name} name={item.name+" "+item.last_name} time=' ' msg={item.moto} contacts={true} id={item.id} photo={item.profile_picture}></ChatItem>
                        </>
                    )
                }
                return <ChatItem key={item.name} name={item.name+" "+item.last_name} time=' ' msg={item.moto} contacts={true} id={item.id} photo={item.profile_picture}></ChatItem>
            })}
        </div>
    )
}

export default Contacts;