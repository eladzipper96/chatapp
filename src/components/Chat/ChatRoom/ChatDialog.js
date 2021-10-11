import classes from './ChatDialog.module.scss';
import avatar from '../../../assets/avatar.jpg'

const ChatDialog = (props) => {
    var MainClass = [classes.main]
    var ContainerClass = [classes.container]
    var TimeClass = [classes.time]
    var PictureClass = [classes.picture_container];

    if(props.owner === 'user') {
        MainClass.push(classes.main_user)
        ContainerClass.push(classes.blue)
        TimeClass.push(classes.time_user)
        PictureClass.push(classes.picture_user)
    }
    if(props.owner === 'friend') {
        ContainerClass.push(classes.white)
        PictureClass.push(classes.picture_friend)
    }
    

    return (
        <div className={MainClass.join(' ')}>
            <div className={ContainerClass.join(' ')}>
                <p>
                Pictures will keep your audience from being bored. In order for you to succeed, you need to keep them interested and involved.
                </p>
            </div>
            <div className={TimeClass.join(' ')}>12:00am</div>
            <div className={PictureClass.join(' ')}>
                    <img src={avatar} alt='pic'></img>
            </div>
        </div>

    )
}

export default ChatDialog;