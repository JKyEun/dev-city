import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/chat.scss';
import ChatRoom from './ChatRoom';
import EachFriend from './EachFriend';

export default function Chat({ setIsChatOpen }) {
  const userInfo = useSelector((state) => state.user);
  const [friendList, setFriendList] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [nowChattingWith, setNowChattingWith] = useState(null);

  useEffect(() => {
    if (!userInfo.following) return;

    let friendListArr = [];

    for (let i = 0; i < userInfo.following.length; i++) {
      for (let j = 0; j < userInfo.follower.length; j++) {
        if (userInfo.following[i].userId === userInfo.follower[j].userId) {
          friendListArr.push(userInfo.following[i]);
        }
      }
    }

    setFriendList(friendListArr);
  }, [userInfo]);

  return (
    <div className="chat">
      <div className="friendList">
        <div className="friendListTitle">친구 목록</div>
        {friendList && (
          <ul>
            {friendList.map((friend) => (
              <EachFriend
                key={friend.userId}
                friend={friend}
                setRoomId={setRoomId}
                setNowChattingWith={setNowChattingWith}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="chatArea">
        {roomId ? (
          <ChatRoom roomId={roomId} nowChattingWith={nowChattingWith} />
        ) : (
          <div className="intro"></div>
        )}
      </div>
      <div onClick={() => setIsChatOpen(false)} className="closeBtn">
        <img src="/images/icon_close.svg" alt="닫는 버튼" />
      </div>
    </div>
  );
}
