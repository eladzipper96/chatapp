import classes from './ChatDialog.module.scss';

const ChatDialog = (props) => {

    var MainClass = [classes.main]
    var ContainerClass = [classes.container]
    var TimeClass = [classes.time]
    var PictureClass = [classes.picture_container];

    // changes the component css styling according to
    // a prop passed by ChatRoom
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
                {props.msg}
                </p>
            </div>
            <div className={TimeClass.join(' ')}>{props.time}</div>
            <div className={PictureClass.join(' ')}>
                    <img src={props.photo} alt='pic'></img>
            </div>
        </div>

    )
}

export default ChatDialog;