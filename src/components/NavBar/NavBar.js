import classes from './NavBar.module.scss';
import icon from '../../assets/chaticon.svg'
import chat from '../../assets/chaticon_nav.svg'
import friends from '../../assets/friends.svg'
import profile from '../../assets/profile.svg'
import io from 'socket.io-client'

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user-slice';
import { uiActions } from '../../store/ui-slice';

const NavBar = () => {


    const dispatch = useDispatch()




    return (
    <div className={classes.main}>

        <div className={classes.logo_container}>
            <img className={classes.logo} src={icon} alt="Icon"></img>
        </div>

        <div className={classes.nav}>
            <div className={classes.icon_container}>
                <img src={chat} alt="chat" onClick={() => dispatch(uiActions.SetPage("Chats"))}></img>
            </div>

            <div className={classes.icon_container}>
            <img src={friends} alt="contacts" onClick={() => dispatch(uiActions.SetPage("Contacts"))}></img>
            </div>

            <div className={classes.icon_container}>
            <img src={profile} alt="profile" onClick={() => dispatch(uiActions.SetPage("Profile"))}></img>
            </div>
        </div>
    </div>)
    
}

export default NavBar;