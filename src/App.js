import './App.css';
import NavBar from './components/NavBar/NavBar';
import Chat from './components/Chat/Chat'
import ChatList from './components/ChatList/ChatList'

function App() {
  return (
    <div className='app'>
      <NavBar />
      <ChatList />
      <Chat/>
    </div>
  );
}

export default App;
