import classes from './Contacts.module.scss'
import ChatItem from "./ChatItem/ChatItem";

import { useSelector } from 'react-redux';

const Friends = () => {  

    const firstlist = useSelector(state => state.user.contacts)
    const secondlist = [...firstlist] // fix a bug of trying change readonly array
    const FinalList = secondlist.sort((a,b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0)
    })


    return (
        <div>
            {FinalList.map((item,index) => {
                if(index===0) {
                    return (
                        <>
                        <div className={classes.letter}>{item.name.substring(0,1)}</div>
                        <ChatItem key={item.name} name={item.name} time=' ' msg={item.address} contacts={true} id={item.id}></ChatItem>
                        </>
                    )  
                }
                if(item.name.charCodeAt(0) !== FinalList[index-1].name.charCodeAt(0)) {
                    return (
                        <>
                        <div className={classes.letter}>{item.name.substring(0,1)}</div>
                        <ChatItem key={item.name} name={item.name} time=' ' msg={item.address} contacts={true} id={item.id}></ChatItem>
                        </>
                    )
                }
                return <ChatItem key={item.name} name={item.name} time=' ' msg={item.address} contacts={true} id={item.id}></ChatItem>
            })}
        </div>
    )
}

export default Friends;