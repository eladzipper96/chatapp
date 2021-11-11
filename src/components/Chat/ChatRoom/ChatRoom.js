import classes from './ChatRoom.module.scss';
import avatar from '../../../assets/avatar.jpg'
import search from '../../../assets/search.svg'
import dots from '../../../assets/dots.svg'
import dotsblack from '../../../assets/dots_black.svg'
import emoji from '../../../assets/emoji.svg'
import arrowright from '../../../assets/arrowright.svg'
import info from '../../../assets/info.svg'
import trashcan from '../../../assets/delete.svg'
import block from '../../../assets/block.svg'
import io from 'socket.io-client'
import ChatDialog from './ChatDialog'
import {userActions} from '../../../store/user-slice'
import { useState, useEffect ,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ChatRoom = (props) => {

    const [showPopUp, setShowPopUp] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [SearchValue, setSearchValue] = useState('')
    var [Chat, setChat] = useState([])
    const userID = useSelector(state => state.user.id)
    const userPhoto = useSelector(state => state.user.profile_picture)
    const chatId = useSelector(state => state.ui.chatId)
    const chatArray = useSelector(state => state.user.chats)
    const contactName = useSelector(state => state.ui.contactName)
    const contactPhoto = useSelector(state => state.ui.contactPhoto)

    const messagesEndRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(chatId.length>2) { /// this is TEMP!!!!!!!!!
            

                const temp = chatArray.filter(item => item.id === chatId)
                setChat(temp[0].content)
             
            scrollToBottom()
        }
    },[chatId,chatArray,Chat])

    props.socket.on('message', (obj) => {
        console.log("---inside the socket.on ----")
        if(obj.author !== userID) {
            //console.log(obj.value)
            //Chat = [...Chat, {author: obj.author, value: obj.value}]
            setChat(chat => {
                if(chat[chat.length-1].id !== obj.id) {
                    updateLastMessage(new Date(),undefined,obj)
                    return [...chat,{author: obj.author, value: obj.value, id: obj.id, time:obj.time}]
                }
                else {
                    return [...chat]
                }
            })
        }
    })

    const updateLastMessage = (date,minutes,values) => {
        var temparr = chatArray.map((item) => { 
            var temp;
            if(item.id === chatId) {
                if(values) { // you get values only when your contact send message
                    temp = [...item.content, {author: values.id, value: values.value, time: `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()}`, read: false}]
                }
                if(!values) {
                    temp = [...item.content, {author: userID, value: inputValue, time: `${date.getHours()}:${minutes}`, read: true}]
                }


                return {
                        content: temp,
                        id: item.id,
                        owners: item.owners
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

            props.socket.emit('message', {author: userID, value: inputValue, id:`${Math.floor(Math.random() * 10000)}`, time: `${date.getHours()}:${date.getMinutes()}`})

            setChat(chat => [...chat,{author: userID, value: inputValue, time: `${date.getHours()}:${minutes}`}])

            updateLastMessage(date,minutes)

            setInputValue('')
        }
    }

    return (
    <div className={classes.container}>
        <div className={classes.topbar}>
                <div className={classes.topbar_left}>
                <div className={classes.image_container}>
                    <img src={contactPhoto} alt={'profile'}></img>
                </div>
                <div className={classes.name}>{contactName}</div>
                <div className={classes.time}>Last Seen: 15:50</div>
            </div>
            <div className={classes.topbar_right}>
                <img src={search} alt='search' onClick={()=> setShowSearch(val => !val)}></img>
                <img src={!showPopUp ? dots : dotsblack} alt="options" onClick={()=> setShowPopUp(val => !val)}></img>
            </div>           

        </div>

        {showPopUp &&
            <div className={classes.popup}>
                <ul>
                    <li>
                        <img src={info} alt={'info'}></img>
                        <span>View Info</span> 
                    </li>
                    <li>
                        <img src={trashcan} alt={'info'}></img>
                        <span>Delete</span> 
                    </li>
                    <li>
                        <img src={block} alt={'info'}></img>
                        <span>Block</span> 
                    </li>
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
                        return <ChatDialog key={index} owner={item.author===userID ? 'user' : 'friend'} msg={item.value} time={item.time}
                         photo={item.author===userID ? userPhoto : contactPhoto}/>
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