import classes from './Login.module.scss';
import logo from '../../assets/chaticon.svg';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice';
import { uiActions } from '../../store/ui-slice';

import Spinner from '../Spinner/Spinner';

const Login = (props) => {
  
  const dispatch = useDispatch();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const [registerUser, setRegisterUser] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerName, setRegisterName] = useState('');

  const [spinnerFlag, setSpinnerFlag] = useState('');

  const cookies = document.cookie;

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {

    // Checks on Entrance if session Cookie exist.
    //  if user doesn't have one useEffect won't do anything.

    const cookieChecker = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/cookiecheck`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.text();
        const res = JSON.parse(result);

        // case server confirmed cookie existance and legtimacy
        if (res.length > 0) {

          // updating the user store slice with date from DB
          dispatch(userActions.SetUser(res[0]));

          // creating a web socket for each chat
          const temp = res[0].chats.map((chat) => {
            const socket = io(`${REACT_APP_API_URL}`, {
              query: `chatid=${chat.id}`,
            });

            return {
              ...chat,
              socket: socket,
            };
          });

          // creating a personal Control socket
          const controlSocket = io(`${REACT_APP_API_URL}`, {
            query: `chatid=${res[0]._id}`,
          });

          // updating the state with the new created data
          dispatch(userActions.updateChat(temp));
          dispatch(uiActions.setControlSocket(controlSocket));

          // allowing React to render the actual app.
          props.setlogin(true);
        }
        } catch {
          console.log('not logged in');
        }
    };

      // executing the code above
      cookieChecker();

  }, [REACT_APP_API_URL]);

  // Handeling the Submition of Login form
  const sumbitHandler = (e) => {
    e.preventDefault();

    // Case username and password length are valid.
    if (Username.length > 3 && Password.length > 5 ) {

      setSpinnerFlag(true); // Activating Spinner while fetching data.

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: Username,
          password: Password,
        }),
      };

      // Fetching Data and session cookie
      fetch(`${REACT_APP_API_URL}/login`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.length > 0) {

            // updating the user store slice with date from DB
            dispatch(userActions.SetUser(res[0]));

            // creating a web socket for each chat
            const temp = res[0].chats.map((chat) => {
              const socket = io(`${REACT_APP_API_URL}`, {
                query: `chatid=${chat.id}`,
              });

              return {
                ...chat,
                socket: socket,
              };
            });

            // creating a personal Control socket
            const controlSocket = io(`${REACT_APP_API_URL}`, {
              query: `chatid=${res[0]._id}`,
            });

            // updating the state with the new created data
            dispatch(userActions.updateChat(temp));
            dispatch(uiActions.setControlSocket(controlSocket));
            props.setlogin(true);
          }

          // Case username or password are wrong
          if (res.length === 0) {
            setSpinnerFlag(false);
            setPassword('');
            alert('username or password are wrong, please try again');
          }
        });
    }
  };

  // Handle the Registration form submit
  const submitRegister = (e) => {
    e.preventDefault();

    // Case all inputs are legit
    if (
      registerUser.length > 3 &&
      registerPass.length > 5 &&
      registerEmail.includes('@') &&
      registerName.includes(' ')
    ) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerUser,
          password: registerPass,
          email: registerEmail,
          name: registerName,
        }),
      };
      // sending data to the server
      fetch(`${REACT_APP_API_URL}/register`, requestOptions)
        .then((val) => val.json())
        .then((val) => {

          // case username taken
          if (val.status === 'taken') {
            alert('username already taken');
            setRegisterUser('');
            setRegisterPass('');
          }

          // case username is free
          if (val.status === 'ok') {
            alert('Registration completed, Welcome!');
            setRegisterUser('');
            setRegisterPass('');
            setRegisterEmail('');
            setRegisterName('');
          }
        });
      // case one of the inputs are bad
    } else {
      alert('One of the inputs are not valid, Registration failed.');
    }
  };

  // case user has session cookie, a loading page will be displayed
  // until all of his data is fetched.
  if (cookies.length !== 0) {
    return (
      <div className={classes.loading}>
        <div className={classes.logo}>
          <img src={logo} alt="logo"></img>
        </div>
        <Spinner />
      </div>
    );
  }

  // Case user doesn't have session cookie
  // rendering the login/register page
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
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={Username}
              required
              minLength={4}
            ></input>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              required
              minLength={6}
            ></input>
            <button type="submit">Login</button>
          </form>
          {spinnerFlag && <Spinner />}
        </div>

        <div className={classes.buffer}></div>

        <div className={classes.register}>
          <h2 className={classes.title}>Register</h2>
          <form className={classes.registerform} onSubmit={submitRegister}>
            <label>Username</label>
            <input
              type="text"
              required
              onChange={(e) => {
                setRegisterUser(e.target.value);
              }}
              value={registerUser}
              minLength={4}
            ></input>
            <small>Username has to be minimum of 4 letters</small>
            <label>Password</label>
            <input
              required
              type="password"
              onChange={(e) => {
                setRegisterPass(e.target.value);
              }}
              value={registerPass}
              minLength={6}
            ></input>
            <small>Password has to be minimum of 6 letters</small>
            <label>Email</label>
            <input
              required
              type="email"
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
              value={registerEmail}
            ></input>
            <small></small>
            <label>Full Name</label>
            <input
              type="text"
              required
              onChange={(e) => {
                setRegisterName(e.target.value);
              }}
              value={registerName}
            ></input>
            <small>Full name must include both first and last name</small>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
