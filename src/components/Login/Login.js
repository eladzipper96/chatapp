import classes from './Login.module.scss'
import logo from '../../assets/chaticon.svg'
import io from 'socket.io-client'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice'


const Login = (props) => {

    const dispatch = useDispatch();
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const sumbitHandler = (e) => {
        e.preventDefault()

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
                console.log(res[0].chats)
                
                const temp = res[0].chats.map((chat) => {
                    const socket = io('http://localhost:5000', {query:`chatid=${chat.id}`})
                    return {
                        ...chat,
                        socket: socket
                    }
                })

                dispatch(userActions.updateChat(temp))
                props.setlogin(true)
            }
            if(res.length===0) {
                alert("username of password are wrong, please try again")
            }
        })

        
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
                        <input type='text' onChange={(e)=> setUsername(e.target.value)}></input>
                        <label>Password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                        <button type='button' onClick={sumbitHandler}>Login</button>
                    </form>
                </div>

                <div className={classes.buffer}></div>
               
                <div className={classes.register}>
                    <h2 className={classes.title}>Register</h2>
                    <form className={classes.registerform}>
                        <label type='text'>Username</label>
                        <input></input>
                        <label type='password'>Password</label>
                        <input></input>
                        <label type='email'>Email</label>
                        <input></input>
                        <label>Full Name</label>
                        <input type='text'></input>
                        <button type='button'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;