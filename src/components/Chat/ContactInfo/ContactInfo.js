import classes from './ContactInfo.module.scss'

import block from '../../../assets/block_white.svg'
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

import { useSelector, useDispatch } from 'react-redux'
import { uiActions } from '../../../store/ui-slice'

const ContactInfo = () => {

    const dispatch = useDispatch();

    //const photo = useSelector(state => state.ui.contactPhoto)
    const selected_id = useSelector(state => state.ui.SelectedContact)
    const contacts_array = useSelector(state => state.user.contacts)
    const chats_array = useSelector(state => state.user.chats)

    var contact;
    var chatid;

    const temp = contacts_array.filter(item => item.id === selected_id)
   contact = temp[0];

    const temp_2 = chats_array.filter(item => item.owners.includes(contact.id))
    if(temp_2.length>0) {
        chatid = temp_2[0].id
    }
    

    const msgButtonHandler = () => {
        dispatch(uiActions.SetPage('Chats'))
        dispatch(uiActions.setContactName(contact.name+" "+contact.last_name))
        dispatch(uiActions.setContactPhoto(contact.profile_picture))
        dispatch(uiActions.setChatId(chatid))
    }

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <img className={classes.photo} src={contact.profile_picture} alt='profile'></img>
                <div className={classes.name}>{contact.name+" "+contact.last_name}</div>
                <div className={classes.icons}>
                    <div className={[classes.sendmsg,classes.block].join(' ')} onClick={msgButtonHandler}>
                        <img src={block} alt='send message' ></img>
                    </div>
                    <div className={classes.sendmsg} onClick={msgButtonHandler}>
                        <img src={sendmsg} alt='send message' ></img>
                    </div>
                </div>

                
            </div>

            <div className={classes.scroll}>           

            <div className={classes.info}>
                <div className={classes.item}>
                    <div className={classes.subject}>Local Time</div>
                    <div className={classes.value}>13:23 PM</div>
                    <img className={classes.icon} src={time} alt="time"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Birth Date</div>
                    <div className={classes.value}>{contact.birthday.substring(0,10)}</div>
                    <img className={classes.icon} src={date} alt="date"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Phone Number</div>
                    <div className={classes.value}>{contact.phone}</div>
                    <img className={classes.icon} src={phone} alt="phone"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Email</div>
                    <div className={classes.value}>{contact.email}</div>
                    <img className={classes.icon} src={email} alt="email"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Website</div>
                    <div className={classes.value}>{contact.website}</div>
                    <img className={classes.icon} src={website} alt="website"></img>
                </div>
                <div className={classes.item}>
                    <div className={classes.subject}>Address</div>
                    <div className={classes.value}>{contact.address}</div>
                    <img className={classes.icon} src={house} alt="address"></img>
                </div>

            </div>

            <div className={classes.info}>
                <div className={classes.item}>
                        <div className={classes.subject}>Facebook</div>
                        <div className={classes.value}>{contact.facebook}</div>
                        <img className={classes.icon} src={facebook} alt="facebook"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Twitter</div>
                        <div className={classes.value}>{contact.twitter}</div>
                        <img className={classes.icon} src={twitter} alt="twitter"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Instagram</div>
                        <div className={classes.value}>{contact.instagram}</div>
                        <img className={classes.icon} src={instagram} alt="instagram"></img>
                </div>
                <div className={classes.item}>
                        <div className={classes.subject}>Linkedin</div>
                        <div className={classes.value}>{contact.linkedin}</div>
                        <img className={classes.icon} src={linkedin} alt="linkedin"></img>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ContactInfo;