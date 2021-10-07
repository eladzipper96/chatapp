import classes from './ChatItem.module.scss'
import profile_picture from '../../../assets/profilepicture.jpg'
import avatar from '../../../assets/avatar.jpg'

const ChatItem = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.image_container}>
                <img src={avatar} alt="profile"></img>
            </div>
            <div className={classes.name}>Israel Israeli</div>
            <div className={classes.time}>12:30</div>
            <div className={classes.msg}>Last Message, more of the last message</div>
        </div>
    )
}

export default ChatItem