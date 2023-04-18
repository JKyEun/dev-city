import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setChatLog } from '../../store/modules/chat';
import Loading from '../Loading';

export default function ChatRoom() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const chatInput = useRef('');
  const userInfo = useSelector((state) => state.user);
  const socket = io('http://3.34.52.131:4000');
  const messageWindow = useRef(null);
  const nowChattingWith = useSelector((state) => state.chat.nowChattingWith);
  const roomId = useSelector((state) => state.chat.roomId);
  const chatLog = useSelector((state) => state.chat.chatLog);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (chatInput.current.value === '') return;

    const message = chatInput.current.value;
    const data = {
      roomId,
      userName,
      message,
    };

    const date =
      new Date().getHours().toString().padStart(2, '0') +
      ':' +
      new Date().getMinutes().toString().padStart(2, '0');

    const newChat = {
      userName,
      message,
      date,
    };

    // 소켓으로 메시지 전송
    await socket.emit('send_message', data);

    // 채팅 로그 갱신
    const newChatLog = [...chatLog, newChat];
    dispatch(setChatLog(newChatLog));

    // DB에 전송
    const res = await axios.post(
      `http://3.34.52.131:4000/chat/push/${roomId}`,
      newChat,
    );

    console.log(res.data);

    // 입력창 비우기
    chatInput.current.value = '';
    console.log(newChat.date);
  };

  const scrollToBottom = () => {
    if (messageWindow.current) {
      messageWindow.current.scrollTop = messageWindow.current.scrollHeight;
    }
  };

  const getChatLog = async () => {
    try {
      const res = await axios.get(`http://3.34.52.131:4000/chat/get/${roomId}`);
      console.log(res.data);

      dispatch(setChatLog(res.data.chatLog));

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUserName(userInfo.userId);
  }, [userInfo]);

  useEffect(() => {
    socket.emit('join', { roomId, userName });

    // 서버에서 메시지를 받으면 채팅 로그 갱신
    socket.on('receive_message', (data) => {
      if (data.userName === userInfo.userId) return;

      const date =
        new Date().getHours().toString().padStart(2, '0') +
        ':' +
        new Date().getMinutes().toString().padStart(2, '0');

      const newChat = {
        userName: data.userName,
        message: data.message,
        date,
      };

      dispatch(setChatLog([...chatLog, newChat]));
    });
  }, [socket, roomId, userName, chatLog]);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog, messageWindow]);

  useEffect(() => {
    getChatLog();
  }, [nowChattingWith]);

  return (
    <div className="chatRoom">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="roomTitle">
            <div className="imgWrap">
              <img
                src={
                  nowChattingWith.profileImg ||
                  nowChattingWith.profileImg !== ''
                    ? nowChattingWith.profileImg
                    : '/images/default-profile.png'
                }
                alt="프로필 이미지"
              />
            </div>
            <div className="nickName">{nowChattingWith.nickName}</div>
          </div>
          <ul className="message" ref={messageWindow}>
            {chatLog &&
              chatLog.map((chat, idx) => (
                <li
                  key={idx}
                  className={
                    chat.userName === userInfo.userId ? 'myChat' : 'yourChat'
                  }
                >
                  <div className="contentWrap">
                    <div className="content">{chat.message}</div>
                    <div className="time">{chat.date}</div>
                  </div>
                  <div className="imgWrap">
                    <img
                      src={
                        chat.userName === userInfo.userId
                          ? userInfo.profileImg || userInfo.profileImg !== ''
                            ? userInfo.profileImg
                            : '/images/default-profile.png'
                          : nowChattingWith.profileImg ||
                            nowChattingWith.profileImg !== ''
                          ? nowChattingWith.profileImg
                          : '/images/default-profile.png'
                      }
                      alt="프로필 이미지"
                    />
                  </div>
                </li>
              ))}
          </ul>
          <form onSubmit={sendMessage}>
            <div className="imgWrap">
              <img
                src={
                  userInfo.profileImg || userInfo.profileImg !== ''
                    ? userInfo.profileImg
                    : '/images/default-profile.png'
                }
                alt="프로필 이미지"
              />
            </div>
            <input
              className="messageInput"
              type="text"
              ref={chatInput}
              placeholder="메시지를 입력하세요."
            />
            <button className="submitBtn" type="submit">
              <img src="/images/icon_message_white.svg" alt="전송 버튼" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
