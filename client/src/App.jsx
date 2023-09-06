
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/LoginPage/Login'
import Chat from './pages/ChatPage/Chat'
import io from 'socket.io-client'
import { useState } from "react"

const socket = io.connect('http://localhost:4000'); 

const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <main className="
        h-screen w-screen
        flex flex-col justify-center items-center">
        <Routes>
          <Route 
            path='/'
            element={ <Login username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} /> }
          />
          <Route
            path='/chat'
            element={ <Chat username={username} room={room} socket={socket} /> }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App
