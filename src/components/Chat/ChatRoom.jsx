import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

export default function ChatRoom() {
  const [chatLog, setChatLog] = useState([]);
  const [userName, setUserName] = useState(null);
  const chatInput = useRef('');
  const userInfo = useSelector((state) => state.user);
  const socket = io('http://localhost:4000');

  const roomId = '11';

  const sendMessage = (e) => {
    e.preventDefault();
    if (chatInput.current.value === '') return;

    const message = chatInput.current.value;
    socket.emit('message', { roomId, userName, message });

    const newChat = {
      userName,
      message,
      date: new Date(),
    };
    setChatLog([...chatLog, newChat]);

    chatInput.current.value = '';
  };

  useEffect(() => {
    setUserName(userInfo.userId);
  }, [userInfo]);

  return (
    <>
      <div className="message">
        <ul className="yourChat"></ul>
        <ul className="myChat">
          {chatLog.map((chat, idx) => (
            <li key={idx}>
              <span>{chat.userName}: </span>
              {chat.message}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" ref={chatInput} placeholder="메시지를 입력하세요." />
        <button type="submit">보내기</button>
      </form>
    </>
  );
}
