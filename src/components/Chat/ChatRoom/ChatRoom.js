import classes from './ChatRoom.module.scss';
import avatar from '../../../assets/avatar.jpg'
import search from '../../../assets/search.svg'
import dots from '../../../assets/dots.svg'
import dotsblack from '../../../assets/dots_black.svg'
import emoji from '../../../assets/emoji.svg'
import arrowright from '../../../assets/arrowright.svg'

import ChatDialog from './ChatDialog'

import { useState } from 'react'

const ChatRoom = () => {

    const [showSearch, setShowSearch] = useState(false)
    const [inputValue, setInputValue] = useState("")

    return (
    <div className={classes.container}>
        <div className={classes.topbar}>
                <div className={classes.topbar_left}>
                <div className={classes.image_container}>
                    <img src={avatar} alt={'profile'}></img>
                </div>
                <div className={classes.name}>Israel Israeli</div>
                <div className={classes.time}>Last Seen: 15:50</div>
            </div>
            <div className={classes.topbar_right}>
                <img src={dots} alt="options"></img>
                <img src={search} alt='search' onClick={()=> setShowSearch(val => !val)}></img>
            </div>
        </div>

        <div className={classes.search}>
            <input placeholder='Search'></input>
            <img src={search} alt='search'></img>
        </div>

        <div className={!showSearch ? classes.chat_container : [classes.chat_container,classes.chat_container_translate].join(' ')}>
            <div className={classes.chatbox}>
                <ChatDialog owner={'user'}/>
                <ChatDialog owner={'friend'}/>
                <ChatDialog owner={'user'}/>
                <ChatDialog owner={'friend'}/>
                <ChatDialog owner={'user'}/>
                <ChatDialog owner={'friend'}/>
                <ChatDialog owner={'user'}/>
                <ChatDialog owner={'friend'}/>
            </div>
        </div>

        <div className={classes.input_container}>
            <input placeholder="Type your message here..." defaultValue={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}></input>
            <img className={classes.emoji_icon} src={emoji} alt='emoji'></img>
            <button type="submit" className={classes.send}>
                <img src={arrowright} alt='>'></img>
            </button>
            
        </div>
    </div>)
    
}

export default ChatRoom;