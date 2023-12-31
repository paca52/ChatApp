
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import io from 'socket.io-client'
import Login from './pages/LoginPage/Login'
import Chat from './pages/ChatPage/Chat'

const socket = io.connect('https://chatappwebserver.onrender.com/'); 

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
