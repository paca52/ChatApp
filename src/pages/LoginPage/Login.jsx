
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const handleInput = e => setUsername(e.target.value);
  const handleRoom = e => setRoom(e.target.value);
  const joinRoom = () => {
    if (room !== '' && username !== '' && username.length <= 16) {
      socket.emit('join_room', { username, room });
      navigate('/chat', { replace: true });
    }
  };

  return (
    <section className="
      flex flex-col justify-center items-center 
      w-80 h-96 px-3 py-5 
      bg-gray-100
      block-shadow">
      <h1 className="
        flex flex-col justify-center items-start 
        text-4xl font-bold text-font-color
        w-5/6 h-3/6 mx-5
        ">
        <span className="block font-normal text-base text-font-color-sub">
          Welcome to,
        </span>
        Chat Rooms</h1>
      <form className="
        flex flex-col justify-center items-center
        text-font-color
        h-3/5 w-5/6
        gap-2">
        <input 
          className="
          w-5/6 h-1/4 p-2
          block-shadow
          bg-bg-color outline-none
          focus:border-[2px] focus:border-input-focus"
          type="text"
          placeholder="Username"
          onChange={handleInput}
        />
        <select
          className="
          w-5/6 h-1/4 my-2 p-2
          bg-bg-color block-shadow"
          onChange={handleRoom}
        >
          <option>-- Select Room --</option>
          <option value='Room 1'>Room 1</option>
          <option value='Room 2'>Room 2</option>
          <option value='Room 3'>Room 3</option>
          <option value='Room 4'>Room 4</option>
        </select>
        <button 
          className="
          w-5/6 h-1/4 block-shadow
          active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          onClick={joinRoom}
        >Join Room</button>
      </form>
    </section>
  );
}

export default Login;
