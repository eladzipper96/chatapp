import classes from './ChatRoom.module.scss';

import search from '../../../assets/search.svg'
import dots from '../../../assets/dots.svg'
import dotsblack from '../../../assets/dots_black.svg'
import emoji from '../../../assets/emoji.svg'
import arrowright from '../../../assets/arrowright.svg'
import info from '../../../assets/info.svg'
import trashcan from '../../../assets/delete.svg'
import addfriend from '../../../assets/add_friend_black.svg'
import block from '../../../assets/block.svg'
import profilepicture from '../../../assets/profilepicture.jpg'
import groupprofile from '../../../assets/groupprofile.png'

import sound from './Beep'

import ChatDialog from './ChatDialog'

import {userActions} from '../../../store/user-slice'
import { uiActions } from '../../../store/ui-slice';
import { useState, useEffect ,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import io from 'socket.io-client'
import Picker from 'emoji-picker-react';


const ChatRoom = (props) => {

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    
    const [showPopUp, setShowPopUp] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [showEmojis, setShowEmojies] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [SearchValue, setSearchValue] = useState('')
    var [Chat, setChat] = useState([])
    var [ChatType, setChatType] = useState()
    var [lastSeen, setLastSeen] = useState()
 
    const userID = useSelector(state => state.user.id)
    const userName = useSelector(state => state.user.name+" "+state.user.last_name)
    const userPhoto = useSelector(state => state.user.profile_picture)
    const Contacts = useSelector(state => state.user.contacts)
    const blocked = useSelector(state => state.user.blocked)
    const chatId = useSelector(state => state.ui.chatId)
    const chatArray = useSelector(state => state.user.chats)
    const activeChats = useSelector(state => state.user.activechats)
    const contactName = useSelector(state => state.ui.contactName)
    const contactPhoto = useSelector(state => state.ui.ChatPhoto)
    const contactId = useSelector(state => state.ui.contactId)
    const showChats = useSelector(state => state.ui.showChats)

    const messagesEndRef = useRef(null)
    const dispatch = useDispatch()
    var [GroupNames, setGroupNames] = useState()

    // handle the setup of the ChatRoom, rendering the messages, contact information and etc../
    useEffect(() => {

                // find the chat object
                const temp = chatArray.filter(item => item.id === chatId)
                if(temp.length>0) {

                    // case the chat object represent a group chat
                    if(temp[0].type === 'group') {
                        const names = Contacts.map(con => {
                            if(temp[0].owners.includes(con.id)) {
                                    return `${con.name} ${con.last_name},`
                            }
                            return "chatroom line 70 error";
                        })
                        setGroupNames([...names,userName].join(' '))
                    }

                    // updaing chat state (messages rendering) and ChatType (ui rendering)
                    setChat(temp[0].content)
                    setChatType(temp[0].type) 
                }

                // fetching the last known last seen of contact and rendering it
                if(temp[0].type ==='friend') lastSeenHandler()         
        
        // removes all unread message notifaction if exist
        setShowPopUp(false)

    },[chatId,chatArray,Chat,Contacts])

    // When Entering a chat, updating the server about the status
    // of unread messages to read.
    useEffect(() => {
        if(chatId.length!=='a') {
                const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    chatid: chatId,
                    id: userID
               })
            }
            try {

             fetch(`${REACT_APP_API_URL}/clearunread`, requestOptions)
             .then(val => val.text())
            }
            catch {
                console.log('')
            }
        }

    },[chatId])


q   // scrolling the user to the bottom of the chat
    useEffect(() => {
        scrollToBottom()
    },[Chat])


    // sound when you get a message
    const beep = () => {
    sound.volume = 0.2;
    sound.play();    
    }


    // Listening to Messages, then renders them
    props.socket.on('message', (obj) => {

        // Checks if sender is not blocked
        if(!blocked.includes(obj.author)) {

            // In case chat is not on ChatList, adds it.
            if(!activeChats.includes(obj.chatid)) {
                dispatch(userActions.updateActiveChats([obj.chatid,...activeChats]))
            }

            // handling new message in case author is not the user
            if(obj.author !== userID) {
                recievemsgHandler(obj)
                beep()
            }
        }

        // in case sender is blocked, update the chat object but not
        // rendering to the screen.
        if(blocked.includes(obj.author)) {
                if(obj.author !== userID) {
                recievemsgHandler(obj)} 
        }
        

    })

    // listening if a contact added you to a group chat
    props.socket.on('newgroup', (obj) => {
        const socket = io(`${REACT_APP_API_URL}`, {query:`chatid=${obj.id}`})

        // creating a chat object to add to the chats array
        dispatch(userActions.updateChat([...chatArray,
            {
            socket: socket,
            content: [],
            id: obj.id,
            owners: obj.owners,
            type: 'group',
            name: obj.name,
            updatedAt: new Date(),
            picture: groupprofile
            }]))

        // adding the chatid to the activechats array so app knows to render
        // this chat in ChatList
        dispatch(userActions.updateActiveChats([...activeChats,obj.id]))
    })

    // fetching the last seen of the contacts and rendering it
    const lastSeenHandler = () => {

        const temp = Contacts.filter(item => item.id === contactId)
        const prevdate = new Date(temp[0].last_seen)
        const now = new Date()
        const datebool = now.getDate() ===  prevdate.getDate() && now.getMonth() === prevdate.getMonth() && now.getFullYear() === prevdate.getFullYear()
        const timebool = now.getHours() === prevdate.getHours() && now.getMinutes() === prevdate.getMinutes()
        const isostring = prevdate.toISOString()

        if(temp.length>0) {
            if(datebool && timebool) {
                setLastSeen('now') 
            }
            if(datebool && !timebool) {
                setLastSeen(`${isostring.substring(11,16)}`)
            }
            if(!datebool && !timebool) {
                setLastSeen(`${isostring.substring(11,16)}, ${isostring.substring(0,10)}`)
            }
        }
    }
    
    // when receving a message this function execute, adds the message to the right
    // chat object and renders it
    const recievemsgHandler = (obj) => {
        const date = new Date()
        const datestr = {day:date.getDate(),month:date.getMonth()+1,year: date.getFullYear()}
        var temparr = chatArray.map(chat => {
            var temp;

            if(obj.chatid === chat.id) {
                temp = [...chat.content, {author: obj.other, authorname: obj.authorname, value: obj.value, time: obj.time, id:obj.id, read:false, year: datestr}]

                return {
                    content: temp,
                    id: chat.id,
                    owners: chat.owners,
                    type: chat.type,
                    socket: chat.socket,
                    updatedAt: new Date(),
                    name: chat.name || undefined,
                    picture: chat.picture || undefined
                }
            }
            else return chat     
        })
        dispatch(userActions.updateChat(temparr))
    }

    // update the last message of a chat to the 'last_message' prop of a ChatItem in ChatList
    const updateLastMessage = (date,minutes,values) => {
        const tempdate = new Date()
        const datestr = {day:date.getDate(),month:date.getMonth()+1,year: date.getFullYear()}
        var temparr = chatArray.map((item) => { 
            var temp;
            
            if(item.id === chatId) {

                if(values) { // you get values only when your contact send message
                    temp = [...item.content, {author: values.author, authorname: values.authorname, value: values.value, time: `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`, read: false, year: datestr}]  
                }
                if(!values) {
                    temp = [...item.content, {author: userID, authorname: userName, value: inputValue, time: `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`, read: true, year: datestr}]
                }
                return {
                        content: temp,
                        id: item.id,
                        owners: item.owners,
                        socket: item.socket,
                        type: item.type,
                        updatedAt: new Date(),
                        name: item.name || undefined,
                        picture: item.picture || undefined
                    }
                }
            else {
                return item;
                }

            })

        dispatch(userActions.updateChat(temparr))
    }

    // scrolling user to the bottom of the the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
      }

    // Execute when user sending a message
    const submitHandler = (e) => {
        e.preventDefault()

        if(inputValue.length>0) {
            const date = new Date()
            var minutes = date.getMinutes()
            const datestr = {day:date.getDate(),month:date.getMonth()+1,year: date.getFullYear()}

            if(date.getMinutes() < 10) {
                minutes = `0${date.getMinutes()}`
            }

            props.socket.emit('message', {author: userID, authorname: userName, value: inputValue, id:`${Math.floor(Math.random() * 10000)}`, time: `${date.getHours()}:${minutes}`, chatid: chatId, year: datestr})

            updateLastMessage(date,minutes)

            setInputValue('')
        }
    }

    const viewInfo = () => {
        dispatch(uiActions.SetPage('Contacts'))
        dispatch(uiActions.setSelectedContact(contactId))
    }

    const deleteChat = () => {
        const temp = activeChats.filter((chat,index) => {
            if(chat !== chatId) {
                return chat
            }

        })
        dispatch(uiActions.setShowChats(false))
        dispatch(userActions.updateActiveChats(temp))
    }

    const BlockUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'block',
                id: userID,
                toblock: contactId,
                chatid: chatId
           })
        }

        fetch(`${REACT_APP_API_URL}/block`, requestOptions).then(val => val.text())

        deleteChat()
        dispatch(userActions.updateBlocked([...blocked,contactId]))
    
    }

    if(!showChats) {
        return <div className={classes.zero}></div>
    }


    return (
    <div className={classes.container}>
        <div className={classes.topbar}>
                <div className={classes.topbar_left}>
                <div className={classes.image_container}>
                    <img src={contactPhoto} alt={'profile'}></img>
                </div>
                <div className={classes.name}>{contactName}</div>
                {ChatType === 'group' && <div className={classes.time}>Group Memebers: {GroupNames}</div>}
                {ChatType === 'friend' && <div className={classes.time}>Last Seen: {lastSeen}</div>}
            </div>
            <div className={classes.topbar_right}>
                <img src={search} alt='search' onClick={()=> {setShowSearch(val => !val)}}></img>
                <img src={!showPopUp ? dots : dotsblack} alt="options" onClick={()=> setShowPopUp(val => !val)}></img>
            </div>           

        </div>

        {showPopUp &&
            <div className={classes.popup}>
                <ul>
                    {ChatType==='friend' &&
                        <li onClick={viewInfo}>
                        <img src={info} alt={'info'}></img>
                        <span>View Info</span> 
                        </li>}
                    {ChatType==='group' &&
                        <li onClick={()=> dispatch(uiActions.setshowAddFriendChat(true))}>
                        <img src={addfriend} alt={'add'}></img>
                        <span>Add Friend</span> 
                        </li>}
                    <li onClick={deleteChat}>
                        <img src={trashcan} alt={'info'}></img>
                        <span>Delete</span> 
                    </li>
                    {ChatType==='friend' &&
                        <li onClick={BlockUser}>
                        <img src={block} alt={'block'}></img>
                        <span className={classes.textred}>Block</span> 
                        </li>}
                    
                </ul>
            </div> }

        <div className={classes.search}>
            <input placeholder='Search' onChange={(e)=> setSearchValue(e.target.value)}></input>
            <img src={search} alt='search'></img>
        </div>

        <div className={!showSearch ? [classes.chat_container,classes.chat_container_translatedown].join(' ') : [classes.chat_container,classes.chat_container_translate].join(' ')}>
            <div className={classes.chatbox}>
                {Chat.map((item, index) => {
                    if(item.value.toLowerCase().includes(SearchValue.toLowerCase())){ // Handle the Search
                            if(ChatType === 'friend') {
                                if(index === 0 ) {
                                    return <> 
                                    <div key={999999999} className={classes.year}>{`${item.year.day+'.'+item.year.month+'.'+item.year.year}`}</div>
                                    <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                    photo={item.author===userID ? userPhoto : contactPhoto}/>
                                     </>
                                }
                                if(Chat[index-1]!==undefined) { // Prevent it read index -1
                                    if(item.year.day !== Chat[index-1].year.day) { 
                                        return <> 
                                            <div key={index*100+"a"} className={classes.year}>{`${item.year.day+'.'+item.year.month+'.'+item.year.year}`}</div>
                                            <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                            photo={item.author===userID ? userPhoto : contactPhoto}/>
                                             </>
                                    }
                                    else {
                                        return <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                        photo={item.author===userID ? userPhoto : contactPhoto}/>
                                    }
                                }
                                else {
                                    return <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                    photo={item.author===userID ? userPhoto : contactPhoto}/>
                                }
                            }
                            if(ChatType === 'group') {
                                var picture;
                                Contacts.forEach(con => { // check is author is a friend, if so used his profile picture
                                    if(con.id === item.author) 
                                    picture = con.profile_picture
                                })
                                if(picture===undefined) { // case author is not a friend
                                    picture = profilepicture
                                }

                                if(index === 0 ) {
                                    return <> 
                                    <div key={999999999} className={classes.year}>{`${item.year.day+'.'+item.year.month+'.'+item.year.year}`}</div>
                                    <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                    photo={item.author===userID ? userPhoto : picture}/>
                                     </>
                                }

                                if(Chat[index-1]!==undefined) { // Prevent it read index -1
                                    if(item.year.day !== Chat[index-1].year.day) { 
                                        return <> 
                                            <div key={index*100+"a"} className={classes.year}>{`${item.year.day+'.'+item.year.month+'.'+item.year.year}`}</div>
                                             <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                             photo={item.author===userID ? userPhoto : picture}/>
                                             </>
                                    }
                                    else {
                                        return <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                        photo={item.author===userID ? userPhoto : picture}/>
                                    }
                                }
                                return <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                photo={item.author===userID ? userPhoto : picture}/>
                            }
                    }
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>

        {showEmojis && (
        <div className={classes.emojicontainer}>
        <Picker native disableAutoFocus={true} onEmojiClick={(e,obj) => setInputValue(val => val+obj.emoji)}/>
        </div>
        )}
        
        <form className={classes.input_container}>
            <input placeholder="Type your message here..." value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}></input>
            <img className={classes.emoji_icon} src={emoji} alt='emoji' onClick={() => setShowEmojies(val=> !val)}></img>
            <button type="submit" className={classes.send} onClick={submitHandler}>
                <img src={arrowright} alt='>'></img>
            </button>
            
        </form>
    </div>)
    
}

export default ChatRoom;