
import React, { useEffect, useState, useRef } from "react";

const MessageList = ({ socket, username }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  const sortMessagesByDate = messages => {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  const formatDateFromTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  useEffect(() => {
    socket.on('receive_message', data => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off('receive_message');
  }, [socket]);

  // display last 100 messages when a user joins
  useEffect(() => {
    socket.on('last_100_messages', (last100Messages) => {
      // console.log('Last 100 messages:', JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off('last_100_messages');
  }, [socket]);

  // scrolling
  useEffect(() => {
    // this line might be broken!!!
    if(messagesColumnRef.current == null) return;

    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  return (
    <div className="block-shadow overflow-y-scroll w-full grow">
      {
        messagesRecieved.map((msg, i) => (
          <div className="block-shadow m-4 p-4 flex flex-col flex-wrap justify-center items-start" key={i}>
            <div className="text-font-color-sub">
              <span 
                style={{ fontWeight: `${msg.username === username ? 'bold' : 'normal'}`, }}
                className="text-xl text-font-color font-semibold"> {msg.username} </span>
              <span className="text-sm"> {formatDateFromTimestamp(msg.__createdtime__)} </span>
            </div>
            <p className="break-words max-w-full"> {msg.message} </p>
          </div>
        ))
      }
    </div>
  );
}

export default MessageList;
