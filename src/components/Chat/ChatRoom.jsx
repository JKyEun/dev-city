import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

export default function ChatRoom({ roomId }) {
  const [chatLog, setChatLog] = useState([]);
  const [userName, setUserName] = useState(null);
  const chatInput = useRef('');
  const userInfo = useSelector((state) => state.user);
  const socket = io('http://localhost:4000');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (chatInput.current.value === '') return;

    const message = chatInput.current.value;
    const data = {
      roomId,
      userName,
      message,
    };

    const newChat = {
      userName,
      message,
      date: new Date(),
    };

    // 채팅 로그 갱신
    setChatLog([...chatLog, newChat]);

    // 소켓으로 메시지 전송
    await socket.emit('send_message', data);

    // 입력창 비우기
    chatInput.current.value = '';
  };

  useEffect(() => {
    setUserName(userInfo.userId);
  }, [userInfo]);

  useEffect(() => {
    socket.emit('join', { roomId, userName });

    // 서버에서 메시지를 받으면 채팅 로그 갱신
    socket.on('receive_message', (data) => {
      console.log(data);

      const newChat = {
        userName: data.userName,
        message: data.message,
        date: new Date(),
      };

      setChatLog([...chatLog, newChat]);
    });
  }, [socket, roomId, userName, chatLog]);
  
  return (
    <div className="chatRoom">
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
    </div>
  );
}
