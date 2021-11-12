import './App.css';
import NavBar from './components/NavBar/NavBar';
import Chat from './components/Chat/Chat'
import ChatList from './components/ChatList/ChatList'
import Login from './components/Login/Login'
import { useEffect, useState } from 'react';

function App() {

  const [LoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if(LoggedIn===true) {


    }
  },[LoggedIn])

  return (
    <>
    {!LoggedIn &&
     <div>
       <Login setlogin={setLoggedIn}/>
    </div>}
    {LoggedIn && 
        <div className='app'>
        <NavBar />
        <ChatList setLoggedIn={setLoggedIn} />
        <Chat/>
      </div>
    }
    </>
  );
}

export default App;
