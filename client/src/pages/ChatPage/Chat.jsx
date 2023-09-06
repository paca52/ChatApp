import MessageList from './Components/MessageList';
import SendButton from './Components/SendButton'
import UserList from './Components/UserList'

const Chat = ({ username, room, socket }) => {
  return (
    <div
      className="
      flex
      w-10/12 h-5/6
      text-xl text-font-color
      "
    >
      <div className='grow-0 basis-3/12'>
        <UserList socket={socket} username={username} room={room} />
      </div>

      <div className="basis-9/12 block-shadow p-5 overflow-hidden flex flex-col bg-gray-200">
        <MessageList socket={socket} username={username} />
        <SendButton socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
