import './App.css';
import NavBar from './components/NavBar/NavBar';
import Chat from './components/Chat/Chat'
import ChatList from './components/ChatList/ChatList'
import Login from './components/Login/Login'
import Control from './components/Control/Control'
import ControlLastSeen from './components/Control/ControlLastSeen'
import io from 'socket.io-client'
import { useState } from 'react';

function App() {

  const [LoggedIn, setLoggedIn] = useState(false)


  return (
    <>
    {!LoggedIn &&
     <div>
       <Login setlogin={setLoggedIn}/>
    </div>}
    {LoggedIn && 
        <>
        <div className='app'>
        <NavBar />
        <ChatList setLoggedIn={setLoggedIn} />
        <Chat/>
        <Control />
        <ControlLastSeen />
      </div>
        
      </>
    }
    </>
  );
}

export default App;
