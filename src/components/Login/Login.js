import classes from './Login.module.scss'
import logo from '../../assets/chaticon.svg'
import io from 'socket.io-client'
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice'
import { uiActions } from '../../store/ui-slice'

import Spinner from '../Spinner/Spinner'

const Login = (props) => {

    const dispatch = useDispatch();
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const [registerUser, setRegisterUser] = useState('')
    const [registerPass, setRegisterPass] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerName, setRegisterName] = useState('')

    const [spinnerFlag , setSpinnerFlag] = useState('')

    const cookies = document.cookie

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {

    
        const cookieChecker = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/cookiecheck`, {credentials: 'include', headers: { 'Content-Type': 'application/json'}})
                const result = await response.text()
                const res = JSON.parse(result);
                if(res.length>0) {
                    dispatch(userActions.SetUser(res[0]))
                
                    const temp = res[0].chats.map((chat) => {
                        const socket = io(`${REACT_APP_API_URL}`, {query:`chatid=${chat.id}`})
    
                        return {
                            ...chat,
                            socket: socket
                        }
                    })
                    const controlSocket = io(`${REACT_APP_API_URL}`, {query:`chatid=${res[0]._id}`})
                    dispatch(userActions.updateChat(temp))
                    dispatch(uiActions.setControlSocket(controlSocket))
                    props.setlogin(true)
                }
            }
            catch {
                console.log("not logged in")
            }
    
        }
        cookieChecker()

    },[REACT_APP_API_URL])

    const sumbitHandler = (e) => {

    e.preventDefault()

    if(Username.length > 0 && (Password.length > 0 || Password === true)) {
        setSpinnerFlag(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: Username,
                password: Password
           })
        }
        fetch(`${REACT_APP_API_URL}/login`, requestOptions)
        .then(res => res.json())
        .then(res => {
            if(res.length>0) {
                dispatch(userActions.SetUser(res[0]))
                
                const temp = res[0].chats.map((chat) => {
                    const socket = io(`${REACT_APP_API_URL}`, {query:`chatid=${chat.id}`})

                    return {
                        ...chat,
                        socket: socket
                    }
                })
                const controlSocket = io(`${REACT_APP_API_URL}`, {query:`chatid=${res[0]._id}`})
                dispatch(userActions.updateChat(temp))
                dispatch(uiActions.setControlSocket(controlSocket))
                props.setlogin(true)
            }
            if(res.length===0) {
                setSpinnerFlag(false)
                setPassword('')
                alert("username or password are wrong, please try again")
                
            }
        })
        }
        
    }

    const submitRegister = (e) => {
        e.preventDefault()

        if(registerUser.length>3 && registerPass.length>5 && registerEmail.includes('@') && registerName.includes(' ')) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: registerUser,
                    password: registerPass,
                    email: registerEmail,
                    name: registerName
               })
            }
            fetch(`${REACT_APP_API_URL}/register`, requestOptions)
            .then(val => val.json())
            .then(val => {
                if(val.status === 'taken') {
                    alert('username already taken')
                    setRegisterUser('')
                    setRegisterPass('')
                }
                if(val.status === 'ok') {
                    alert('Registration completed, Welcome!')
                    setRegisterUser('')
                    setRegisterPass('')
                    setRegisterEmail('')
                    setRegisterName('')
                }
            })
        }
        else {
            alert('One of the inputs are not valid, Registration failed.')
        }
    }

    if(cookies.length!==0) {
        return (
            <div className={classes.loading}>
                <div className={classes.logo}>
                    <img src={logo} alt="logo"></img>
                </div>
                <Spinner />
            </div>
        )
    }

    return ( 
        <div className={classes.container}>

            <div className={classes.logo}>
                <img src={logo} alt="logo"></img>
            </div>

            <div className={classes.main}>

                <div className={classes.login}>
                    <h2 className={classes.title}>Login</h2>
                    <form className={classes.loginform} onSubmit={sumbitHandler}>
                        <label>Username</label>
                        <input type='text' onChange={(e)=> setUsername(e.target.value)} value={Username} required></input>
                        <label>Password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} value={Password} required></input>
                        <button type='submit'>Login</button>
                    </form>
                    {spinnerFlag && <Spinner />}
                </div>

                <div className={classes.buffer}></div>
               
                <div className={classes.register}>
                    <h2 className={classes.title}>Register</h2>
                    <form className={classes.registerform} onSubmit={submitRegister}>
                        <label>Username</label>
                        <input type='text' required onChange={(e) => {setRegisterUser(e.target.value)}} value={registerUser}></input>
                        <small>Username has to be minimum of 4 letters</small>
                        <label >Password</label>
                        <input required type='password' onChange={(e) => {setRegisterPass(e.target.value)}} value={registerPass}></input>
                        <small>Password has to be minimum of 6 letters</small>
                        <label>Email</label>
                        <input required type='email' onChange={(e) => {setRegisterEmail(e.target.value)}} value={registerEmail}></input>
                        <small></small>
                        <label>Full Name</label>
                        <input type='text' required onChange={(e) => {setRegisterName(e.target.value)}} value={registerName}></input>
                        <small>Full name must include both first and last name</small>
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>
            </div>    
        </div>
    )
}

export default Login;