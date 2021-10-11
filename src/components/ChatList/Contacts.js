import classes from './Contacts.module.scss'
import ChatItem from "./ChatItem/ChatItem";

const Friends = () => {

    const contactslist = [{
        name: 'Elad Zipper',
        location: 'Tel Aviv, Israel'
    },
    {
        name: 'Alon Haramtai',
        location: 'Petah Tikva, Tel Aviv'
    },
    {
        name: 'Moshik Ben Lulu',
        location: 'Jerusalem, Tel Aviv'
    },
    {
        name: 'Tamir Moshe',
        location: 'Haifa, Israel'
    },
    {
        name: 'Tamir Goldstein',
        location: 'Ramat Gan, Tel Aviv'
    },
    {
        name: 'Tomer Bergman',
        location: 'Ashkelon, Tel Aviv'
    },
    {
        name: 'Tom Levinsky',
        location: 'Nesher, Tel Aviv'
    }]

    const final_list = contactslist.sort((a,b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0)
    })


    return (
        <div>
            {final_list.map((item,index) => {
                if(index===0) {
                    return (
                        <>
                        <div className={classes.letter}>{item.name.substring(0,1)}</div>
                        <ChatItem key={index} name={item.name} time=' ' msg={item.location} contacts={true}></ChatItem>
                        </>
                    )  
                }
                if(item.name.charCodeAt(0) !== final_list[index-1].name.charCodeAt(0)) {
                    return (
                        <>
                        <div className={classes.letter}>{item.name.substring(0,1)}</div>
                        <ChatItem key={index} name={item.name} time=' ' msg={item.location} contacts={true}></ChatItem>
                        </>
                    )
                }
                return <ChatItem key={index} name={item.name} time=' ' msg={item.location} contacts={true}></ChatItem>
            })}
        </div>
    )
}

export default Friends;