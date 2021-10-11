import classes from './ChatItem.module.scss'
import profile_picture from '../../../assets/profilepicture.jpg'
import avatar from '../../../assets/avatar.jpg'
import location from '../../../assets/location.svg'

const ChatItem = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.image_container}>
                <img src={avatar} alt="profile"></img>
            </div>
            <div className={classes.name}>{props.name}</div>
            <div className={classes.time}>{props.time}</div>
            {!props.contacts && <div className={classes.msg}>{props.msg.substring(0,30)+'...' }</div>}
            {props.contacts &&
            <div className={classes.msg}>
                <img src={location} alt="loc"/>
                {props.msg.substring(0,40)}
            </div>}
        </div>
    )
}

export default ChatItem