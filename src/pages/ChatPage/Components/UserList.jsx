import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', data => setRoomUsers(data));
    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col items-center h-full block-shadow mr-4 bg-gray-200">
      <h1 className="w-9/12 my-10 box-border text-5xl text-center font-bold break-words">
        <span className='text-font-color-sub text-lg block'>
          Welcome to,
        </span>
        {room}
      </h1>
      <div className=" flex flex-col h-full w-full p-4 ">
        { roomUsers.length > 0 && <h5 className="text-xl text-center p-2 font-semibold mb-3 block-shadow">Users</h5> }
        <ul className="grow overflow-y-scroll block-shadow py-2">
          {
            roomUsers.map(user => {
              return <li
                className='px-4'
                style={{ fontWeight: `${user.username === username ? 'bold' : 'normal'}`, }}
                key={user.id}
              >{user.username}</li>
            })
          }
        </ul>
        <button 
          className="block-shadow w-full mb-1 mt-3 font-semibold px-2 py-3 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          onClick={leaveRoom}
        >Leave</button>
      </div>

    </div>
  );
};

export default UserList;
