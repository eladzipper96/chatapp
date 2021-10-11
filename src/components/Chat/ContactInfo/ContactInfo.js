import classes from './ContactInfo.module.scss'

import profilepicture from '../../../assets/profilepicture.jpg'
import sendmsg from '../../../assets/sendmsg.svg'
import time from '../../../assets/time.svg'
import date from '../../../assets/date.svg'
import phone from '../../../assets/phone.svg'
import email from '../../../assets/email.svg'
import website from '../../../assets/website.svg'
import house from '../../../assets/house.svg'
import facebook from '../../../assets/facebook.svg'
import twitter from '../../../assets/twitter.svg'
import instagram from '../../../assets/instagram.svg'
import linkedin from '../../../assets/linkedin.svg'

const ContactInfo = () => {
    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <img src={profilepicture} alt='profile'></img>
                <div className={classes.name}>Adam Adamstein</div>
                <div className={classes.sendmsg}>
                    <img src={sendmsg} alt='send message'></img>
                </div>
            </div>

            <div className={classes.info}>
                <div className={classes.item}>
                    <div className={classes.subject}>Local Time</div>
                    <div className={classes.value}>13:23 PM</div>
                    <img className={classes.icon} src={time} alt="time"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Date</div>
                    <div className={classes.value}>20/12/1996</div>
                    <img className={classes.icon} src={date} alt="date"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Phone Number</div>
                    <div className={classes.value}>+972-12345678</div>
                    <img className={classes.icon} src={phone} alt="phone"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Email</div>
                    <div className={classes.value}>email@mail.com</div>
                    <img className={classes.icon} src={email} alt="email"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Website</div>
                    <div className={classes.value}>www.example.com</div>
                    <img className={classes.icon} src={website} alt="website"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Address</div>
                    <div className={classes.value}>Zabotinsky 32, Ramat Gan</div>
                    <img className={classes.icon} src={house} alt="address"></img>
                </div>

            </div>

            <div className={classes.info}>
                <div className={classes.item}>
                        <div className={classes.subject}>Facebook</div>
                        <div className={classes.value}>@bla.bla</div>
                        <img className={classes.icon} src={facebook} alt="facebook"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Twitter</div>
                        <div className={classes.value}>@bla.bla</div>
                        <img className={classes.icon} src={twitter} alt="twitter"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Instagram</div>
                        <div className={classes.value}>@bla.bla</div>
                        <img className={classes.icon} src={instagram} alt="instagram"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Linkedin</div>
                        <div className={classes.value}>@bla.bla</div>
                        <img className={classes.icon} src={linkedin} alt="linkedin"></img>
                </div>
            </div>
            
        </div>
    )
}

export default ContactInfo;