
import React, { useState } from 'react';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <div className="h-fit w-full flex justify-center items-center mt-3">
      <input
        className="w-10/12 block-shadow p-3 mx-3 focus:border-[2px] focus:border-input-focus"
        placeholder='Message'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button 
        className="font-semibold block-shadow w-2/12 p-3 mx-3 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;
