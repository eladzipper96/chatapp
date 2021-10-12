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

import ChatDialog from './ChatDialog'

import { useState } from 'react'

const ChatRoom = () => {

    const [showPopUp, setShowPopUp] = useState(false)
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
            <input placeholder='Search'></input>
            <img src={search} alt='search'></img>
        </div>

        <div className={!showSearch ? [classes.chat_container,classes.chat_container_translatedown].join(' ') : [classes.chat_container,classes.chat_container_translate].join(' ')}>
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