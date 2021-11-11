import classes from './UserInfoEdit.module.scss';

import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../store/user-slice';

const UserInfoEdit = () => {
    const temp = useSelector(state => state.user)
    const [user,setUser] = useState(temp)
    const [password, setPassword] = useState({cur: "", new: "", repeat: ""})
    const dispatch = useDispatch()

    const [showAccount, setShowAccount] = useState(false)
    const [showSocial, setShowSocial] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const submitHandler = (str) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...user
            })
        }

        const passwordOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...password
            }) 
        }

        if(str==='Account') {
            fetch('http://localhost:5000/account', requestOptions).then(
                dispatch(userActions.SetUser(user)),
                setShowAccount(true)
            )
        }

        if(str==='Social') {
            fetch('http://localhost:5000/social', requestOptions).then(
                dispatch(userActions.SetUser(user)),
                setShowSocial(true)
            ) 
        }

        if(str==='Password') {
            fetch('http://localhost:5000/passwordchange', passwordOptions).then(
                dispatch(userActions.SetUser(user)),
                setShowPassword(true)
            ) 
        }
    }

    const resetInputs = (str) => {
        if(str==='Account') {
            setShowAccount(false)
            setUser(val => {
                return {
                    ...val,
                    name: temp.name,
                    last_name: temp.last_name,
                    phone: temp.phone,
                    birthday: temp.birthday,
                    email: temp.email,
                    website: temp.website,
                    address: temp.address
                }
            })  
            
        }

        if(str==='Social') {
            setShowSocial(false)
            setUser(val => {
                return {
                    ...val,
                    facebook: temp.facebook,
                    twitter: temp.twitter,
                    insagram: temp.instagram,
                    linkedin: temp.linkedin
         
                    }
            })
        }

        if (str==="Password") {
            setShowPassword(false)
            setPassword({cur: "", new: "", repeat: ""})
        }
    }



    return (
    <div className={classes.container}>
        <div className={classes.top}>
            <div className={classes.header}>Settings</div>
            <div className={classes.header_desc}>{'Update Personal Infodmration & Settings'}</div>
        </div>

        <div className={classes.main}>

            <div className={classes.item}>
               <div className={classes.itemtop}>
                    <div className={classes.itemheader}>Account</div>
                    <div>{'Update personal & contact information'}</div>
               </div> 
               <div className={[classes.inputs,classes.account].join(' ')}>
                    <div className={classes.input}>
                        <label>First Name</label>
                        <input type="text" required value={user.name}
                         onChange={(e) => setUser(val => {return {...val,name: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Last Name</label>
                        <input type="text" required value={user.last_name}
                        onChange={(e) => setUser(val => {return {...val,last_name: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Mobile Number</label>
                        <input type="text" required value={user.phone}
                        onChange={(e) => setUser(val => {return {...val,phone: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Birth date</label>
                        <input type="date" required value={user.birthday.substring(0,10)}
                        onChange={(e) => setUser(val => {return {...val,birthday: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Email address</label>
                        <input type="email" required value={user.email}
                        onChange={(e) => setUser(val => {return {...val,email: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Website</label>
                        <input type="text" value={user.website}
                        onChange={(e) => setUser(val => {return {...val,website: e.target.value}})}></input>
                    </div>
                    <div className={[classes.input,classes.inputlong].join(' ')}>
                        <label>Address</label>
                        <input type="text" required value={user.address}
                        onChange={(e) => setUser(val => {return {...val,address: e.target.value}})}></input>
                    </div>
               </div> 
               <div className={classes.buttons}>
                    {showAccount && <div className={classes.updated}>Your information updated successfully!</div>}
                    <div className={classes.buttonsright}>
                        <div onClick={() => resetInputs('Account')}>Reset</div>
                        <div className={classes.savechanges} onClick={() => submitHandler('Account')}>Save Changes</div>
                    </div>

               </div> 
            </div>
        
        
        <div className={classes.item}>
        <div className={classes.itemtop}>
                    <div className={classes.itemheader}>Social network profiles</div>
                    <div>{'Update personal & contact information'}</div>
               </div> 
               <div className={classes.inputs}>
                    <div className={classes.input}>
                        <label>Facebook</label>
                        <input type="text" value={user.facebook}
                        onChange={(e) => setUser(val => {return {...val,facebook: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Twitter</label>
                        <input type="text" value={user.twitter}
                        onChange={(e) => setUser(val => {return {...val,twitter: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Instagram</label>
                        <input type="text" value={user.instagram}
                        onChange={(e) => setUser(val => {return {...val,instagram: e.target.value}})}></input>
                    </div>
                    <div className={classes.input}>
                        <label>Linkedin</label>
                        <input type="text" value={user.linkedin}
                        onChange={(e) => setUser(val => {return {...val,linkedin: e.target.value}})}></input>
                    </div>
               </div> 

               <div className={classes.buttons}>
               {showSocial && <div className={classes.updated}>Your information updated successfully!</div>}
                    <div className={classes.buttonsright}>
                        <div onClick={() => resetInputs('Social')}>Reset</div>
                        <div className={classes.savechanges} onClick={() => submitHandler('Social')}>Save Changes</div>
                    </div>
               </div> 
        </div> 
        
        <div className={classes.item}>
        <div className={classes.itemtop}>
                    <div className={classes.itemheader}>Password</div>
                    <div>{'Update personal & contact information'}</div>
               </div> 
               <div className={classes.inputs}>
                    <div className={[classes.input,classes.cur_pass].join(' ')}>
                        <label>Current Password</label>
                        <input type="password" required value={password.cur}                            onChange={(e) => {
                                setPassword(pass => {
                                   console.log("updating")
                                    return {
                                        repeat: pass.repeat,
                                        new: pass.new,
                                        cur: e.target.value
                                        }
                                    })
                            }}></input>
                    </div>
                    <div className={[classes.input,classes.new_pass].join(' ')}>
                        <label>New Password</label>
                        <input type="password" required value={password.new}
                            onChange={(e) => {
                                setPassword(pass => {
                                   console.log("updating")
                                    return {
                                        repeat: pass.repeat,
                                        new: e.target.value,
                                        cur: pass.cur
                                        }
                                    })
                            }}></input>
                    </div>
                    <div className={[classes.input,classes.rep_pass].join(' ')}>
                        <label>Repeat Password</label>
                        <input type="password" required value={password.repeat}
                            onChange={(e) => {
                                setPassword(pass => {
                                    console.log("updating")
                                    return {
                                        repeat: e.target.value,
                                        new: pass.new,
                                        cur: pass.cur
                                    }
                                })
                            }}> 
                         </input>
                    </div>
               </div> 

               <div className={classes.buttons}>
               {showPassword && <div className={classes.updated}>Your information updated successfully!</div>}
                    <div className={classes.buttonsright}>
                        <div onClick={() => resetInputs('Password')}>Reset</div>
                        <div className={classes.savechanges} onClick={() => submitHandler('Password')}>Save Changes</div>
                    </div>
               </div> 
        </div> 
        </div> 
    </div>
    )
}

export default UserInfoEdit;