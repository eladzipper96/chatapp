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
import ChatDialog from './ChatDialog'
import {userActions} from '../../../store/user-slice'
import { uiActions } from '../../../store/ui-slice';
import { useState, useEffect ,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import io from 'socket.io-client'

const ChatRoom = (props) => {

    const [showPopUp, setShowPopUp] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [SearchValue, setSearchValue] = useState('')
    var [Chat, setChat] = useState([])
    var [ChatType, setChatType] = useState()
    var [lastSeen, setLastSeen] = useState()
    const userID = useSelector(state => state.user.id)
    const userName = useSelector(state => state.user.name+" "+state.user.last_name)
    const userPhoto = useSelector(state => state.user.profile_picture)
    const Contacts = useSelector(state => state.user.contacts)
    const chatId = useSelector(state => state.ui.chatId)
    const chatArray = useSelector(state => state.user.chats)
    const activeChats = useSelector(state => state.user.activechats)
    const contactName = useSelector(state => state.ui.contactName)
    const contactPhoto = useSelector(state => state.ui.ChatPhoto)
    const contactId = useSelector(state => state.ui.contactId)
    const showChats = useSelector(state => state.ui.showChats)

    const messagesEndRef = useRef(null)
    const dispatch = useDispatch()


    useEffect(() => {
        if(chatId.length>2) { /// this is TEMP!!!!!!!!!

                const temp = chatArray.filter(item => item.id === chatId)
                if(temp.length>0) {
                    setChat(temp[0].content)
                    setChatType(temp[0].type) 
                }

                lastSeenHandler()
            
        }
        setShowPopUp(false)
        scrollToBottom()
    },[chatId,chatArray,Chat,Contacts])

    props.socket.on('message', (obj) => {

        if(!activeChats.includes(obj.chatid)) {
            dispatch(userActions.updateActiveChats([obj.chatid,...activeChats]))
        }

        console.log(obj.value)
        if(obj.author !== userID) {
            recievemsgHandler(obj)
        }
    })

    props.socket.on('newgroup', (obj) => {
        const socket = io('http://localhost:5000', {query:`chatid=${obj.id}`})
        dispatch(userActions.updateChat([...chatArray,
            {
            socket: socket,
            content: [],
            id: obj.id,
            owners: obj.owners,
            type: 'group',
            name: obj.name,
            picture: groupprofile
            }]))
        dispatch(userActions.updateActiveChats([...activeChats,obj.id]))
        console.log(obj)
    })


    const lastSeenHandler = () => {

        const temp = Contacts.filter(item => item.id === contactId)
        const prevdate = new Date(temp[0].last_seen)
        const now = new Date()
        const datebool = now.getDate() ===  prevdate.getDate() && now.getMonth() === prevdate.getMonth() && now.getFullYear() === prevdate.getFullYear()
        const timebool = now.getHours() === prevdate.getHours() && now.getMinutes() === prevdate.getMinutes()
        const isostring = prevdate.toISOString()

        if(temp.length>0) {
            if(datebool && timebool) {
                setLastSeen(isostring.substring(11,16)) // in future it will be 'Now'
            }
            if(datebool && !timebool) {
                setLastSeen(`${isostring.substring(11,16)}`)
            }
            if(!datebool && !timebool) {
                setLastSeen(`${isostring.substring(11,16)}, ${isostring.substring(0,10)}`)
            }
        }
    }

    const recievemsgHandler = (obj) => {
        var temparr = chatArray.map(chat => {
            var temp;

            if(obj.chatid === chat.id) {
                temp = [...chat.content, {author: obj.other, authorname: obj.authorname, value: obj.value, time: obj.time, id:obj.id, read:false}]

                return {
                    content: temp,
                    id: chat.id,
                    owners: chat.owners,
                    type: chat.type,
                    socket: chat.socket,
                    name: chat.name || undefined,
                    picture: chat.picture || undefined
                }
            }
            else return chat     
        })
        dispatch(userActions.updateChat(temparr))
    }


    const updateLastMessage = (date,minutes,values) => {
        var temparr = chatArray.map((item) => { 
            var temp;
            
            if(item.id === chatId) {

                if(values) { // you get values only when your contact send message
                    console.log("the mesg read = false")
                    temp = [...item.content, {author: values.author, authorname: values.authorname, value: values.value, time: `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`, read: false}]  
                }
                if(!values) {
                    temp = [...item.content, {author: userID, authorname: userName, value: inputValue, time: `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`, read: true}]
                }
                return {
                        content: temp,
                        id: item.id,
                        owners: item.owners,
                        socket: item.socket,
                        type: item.type,
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
      }

    const submitHandler = () => {

        if(inputValue.length>0) {
            const date = new Date()
            var minutes = date.getMinutes()

            if(date.getMinutes() < 10) {
                minutes = `0${date.getMinutes()}`
            }

            props.socket.emit('message', {author: userID, authorname: userName, value: inputValue, id:`${Math.floor(Math.random() * 10000)}`, time: `${date.getHours()}:${minutes}`, chatid: chatId})

            //setChat(chat => [...chat,{author: userID, value: inputValue, time: `${date.getHours()}:${minutes}`, chatid: chatId}])

            updateLastMessage(date,minutes)

            setInputValue('')
        }
    }

    const viewInfo = () => {
        dispatch(uiActions.SetPage('Contacts'))
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
                {ChatType === 'group' && <div className={classes.time}>Group Memebers: Need 2 do</div>}
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
                        <li>
                        <img src={addfriend} alt={'add'}></img>
                        <span>Add Friend</span> 
                        </li>}
                    <li onClick={deleteChat}>
                        <img src={trashcan} alt={'info'}></img>
                        <span>Delete</span> 
                    </li>
                    {ChatType==='friend' &&
                        <li>
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
                                return <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                photo={item.author===userID ? userPhoto : contactPhoto}/>
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

                                return <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.authorname+" "+item.time}
                                photo={item.author===userID ? userPhoto : picture}/>
                            }
                    }
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
        
        <div className={classes.input_container}>
            <input placeholder="Type your message here..." value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}></input>
            <img className={classes.emoji_icon} src={emoji} alt='emoji'></img>
            <button type="submit" className={classes.send} onClick={submitHandler}>
                <img src={arrowright} alt='>'></img>
            </button>
            
        </div>
    </div>)
    
}

export default ChatRoom;