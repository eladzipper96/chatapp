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

const ContactInfo = () => {

    const user = useSelector(state => state.user)
    const tempdate = new Date()
    const localtime = `${tempdate.getHours()}:${tempdate.getMinutes()}`

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <div className={classes.imgcontainer}>
                    <img src={user.profile_picture} alt='profile' ></img>
                </div>
                <div className={classes.name}>{user.name}</div>
                <div className={classes.logout}>
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
                    <div className={classes.value}>{user.phone}</div>
                    <img className={classes.icon} src={phone} alt="phone"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Email</div>
                    <div className={classes.value}>{user.email}</div>
                    <img className={classes.icon} src={email} alt="email"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Website</div>
                    <div className={classes.value}>{user.website}</div>
                    <img className={classes.icon} src={website} alt="website"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Address</div>
                    <div className={classes.value}>{user.address}</div>
                    <img className={classes.icon} src={house} alt="address"></img>
                </div>

            </div>

            <div className={classes.info}>
                <div className={classes.item}>
                        <div className={classes.subject}>Facebook</div>
                        <div className={classes.value}>{user.facebook}</div>
                        <img className={classes.icon} src={facebook} alt="facebook"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Twitter</div>
                        <div className={classes.value}>{user.twitter}</div>
                        <img className={classes.icon} src={twitter} alt="twitter"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Instagram</div>
                        <div className={classes.value}>{user.instagram}</div>
                        <img className={classes.icon} src={instagram} alt="instagram"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Linkedin</div>
                        <div className={classes.value}>{user.linkedin}</div>
                        <img className={classes.icon} src={linkedin} alt="linkedin"></img>
                </div>
            </div>
            
        </div>
    )
}

export default ContactInfo;