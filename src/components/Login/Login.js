import classes from './Login.module.scss'
import logo from '../../assets/chaticon.svg'
import io from 'socket.io-client'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice'
import { uiActions } from '../../store/ui-slice'


const Login = (props) => {

    const dispatch = useDispatch();
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const [registerUser, setRegisterUser] = useState('')
    const [registerPass, setRegisterPass] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerName, setRegisterName] = useState('')

    const sumbitHandler = (e) => {
        e.preventDefault()

    if(Username.length > 0 && Password.length > 0) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: Username,
                password: Password
           })
        }
        fetch('http://localhost:5000/login', requestOptions)
        .then(res => res.json())
        .then(res => {
            if(res.length>0) {
                dispatch(userActions.SetUser(res[0]))
                
                const temp = res[0].chats.map((chat) => {
                    const socket = io('http://localhost:5000', {query:`chatid=${chat.id}`})

                    return {
                        ...chat,
                        socket: socket
                    }
                })

                const controlSocket = io('http://localhost:5000', {query:`chatid=${res[0]._id}`})
                dispatch(userActions.updateChat(temp))
                dispatch(uiActions.setControlSocket(controlSocket))
                props.setlogin(true)
            }
            if(res.length===0) {
                alert("username of password are wrong, please try again")
                setUsername('')
                setPassword('')
            }
        })
        }
        
    }

    const submitRegister = (e) => {
        e.preventDefault()

        if(registerUser.length>4 && registerPass>5 && registerEmail.includes('@') && registerName.includes(' ')) {
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
            fetch('http://localhost:5000/register', requestOptions)
            .then(val => val.json())
            .then(val => {
                if(val.status === 'taken') {
                    alert('username already taken')
                    setRegisterUser(' ')
                    setRegisterPass(' ')
                }
                if(val.status === 'ok') {
                    alert('Registration completed, Welcome!')
                    setRegisterUser(' ')
                    setRegisterPass(' ')
                    setRegisterEmail(' ')
                    setRegisterName(' ')
                }
            })
        }
        else {
            alert('not sent, upgrade')
        }
    }

    return (
        <div className={classes.container}>

            <div className={classes.logo}>
                <img src={logo} alt="logo"></img>
            </div>

            <div className={classes.main}>

                <div className={classes.login}>
                    <h2 className={classes.title}>Login</h2>
                    <form className={classes.loginform}>
                        <label>Username</label>
                        <input type='text' onChange={(e)=> setUsername(e.target.value)} value={Username} required></input>
                        <label>Password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} value={Password} required></input>
                        <button type='submit' onClick={sumbitHandler}>Login</button>
                    </form>
                </div>

                <div className={classes.buffer}></div>
               
                <div className={classes.register}>
                    <h2 className={classes.title}>Register</h2>
                    <form className={classes.registerform}>
                        <label>Username</label>
                        <input type='text' required onChange={(e) => {setRegisterUser(e.target.value)}} value={registerUser}></input>
                        <label >Password</label>
                        <input required type='password' onChange={(e) => {setRegisterPass(e.target.value)}} value={registerPass}></input>
                        <label>Email</label>
                        <input required type='email' onChange={(e) => {setRegisterEmail(e.target.value)}} value={registerEmail}></input>
                        <label>Full Name</label>
                        <input type='text' required onChange={(e) => {setRegisterName(e.target.value)}} value={registerName}></input>
                        <button type='submit' onClick={submitRegister}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;