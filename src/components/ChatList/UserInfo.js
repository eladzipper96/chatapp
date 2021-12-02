import classes from './UserInfo.module.scss'

import logout from '../../assets/logout.svg'
import time from '../../assets/time.svg'
import date from '../../assets/date.svg'
import phone from '../../assets/phone.svg'
import email from '../../assets/email.svg'
import website from '../../assets/website.svg'
import house from '../../assets/house.svg'
import facebook from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import instagram from '../../assets/instagram.svg'
import linkedin from '../../assets/linkedin.svg'

import { useSelector } from 'react-redux'
import { useState } from 'react'

const ContactInfo = (props) => {

    const user = useSelector(state => state.user)
    const controlSocket = useSelector(state => state.ui.controlSocket)
    var tempdate = new Date()
    tempdate = tempdate.setHours(tempdate.getHours()+2)
    tempdate = new Date(tempdate)
    const localtime = tempdate.toISOString().substring(11,16)

    const logoutHandler = () => {
        props.setLoggedIn(false)
        user.chats.forEach((chat) => {
            chat.socket.emit('deletesocket')
        })  
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
        }   
        controlSocket.emit('deletesocket')
    }


    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <div className={classes.imgcontainer}>
                    <img src={user.profile_picture} alt='profile' ></img>
                </div>
                <div className={classes.name}>{user.name+" "+user.last_name}</div>
                <div className={classes.logout} onClick={logoutHandler}>
                    <img src={logout} alt='logout'></img>
                    <div>Logout</div>
                </div>
            </div>

            <div className={classes.info}>
                <div className={classes.item}>
                    <div className={classes.subject}>Local Time</div>
                    <div className={classes.value}>{localtime}</div>
                    <img className={classes.icon} src={time} alt="time"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Birth Date</div>
                    <div className={classes.value}>{user.birthday.substring(0,10)}</div>
                    <img className={classes.icon} src={date} alt="date"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Phone Number</div>
                    <div className={classes.value}>{user.phone.length > 0 ? user.phone : 'None'}</div>
                    <img className={classes.icon} src={phone} alt="phone"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Email</div>
                    <div className={classes.value}>{user.email.length > 0 ? user.email : 'None'}</div>
                    <img className={classes.icon} src={email} alt="email"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Website</div>
                    <div className={classes.value}>{user.website.length > 0 ? user.website : 'None'}</div>
                    <img className={classes.icon} src={website} alt="website"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Address</div>
                    <div className={classes.value}>{user.address.length > 0 ? user.address : 'None'}</div>
                    <img className={classes.icon} src={house} alt="address"></img>
                </div>

            </div>

            <div className={classes.info}>
                <div className={classes.item}>
                        <div className={classes.subject}>Facebook</div>
                        <div className={classes.value}>{user.facebook.length > 0 ? user.facebook : 'None'}</div>
                        <img className={classes.icon} src={facebook} alt="facebook"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Twitter</div>
                        <div className={classes.value}>{user.twitter.length > 0 ? user.twitter : 'None'}</div>
                        <img className={classes.icon} src={twitter} alt="twitter"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Instagram</div>
                        <div className={classes.value}>{user.instagram.length > 0 ? user.instagram : 'None'}</div>
                        <img className={classes.icon} src={instagram} alt="instagram"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Linkedin</div>
                        <div className={classes.value}>{user.linkedin.length > 0 ? user.linkedin : 'None'}</div>
                        <img className={classes.icon} src={linkedin} alt="linkedin"></img>
                </div>
            </div>
            
        </div>
    )
}

export default ContactInfo;