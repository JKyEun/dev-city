import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../style/chat.scss';
import EachStudy from './EachStudy';
import ChatRoom from './ChatRoom';

export default function Chat({ setIsChatOpen }) {
  const myStudyList = useSelector((state) => state.user.joinedStudy);
  const [roomId, setRoomId] = useState(null);

  console.log(roomId);

  return (
    <div className="chat">
      <div className="friendList">
        {myStudyList && (
          <ul>
            {myStudyList.map((study) => (
              <EachStudy key={study._id} study={study} setRoomId={setRoomId} />
            ))}
          </ul>
        )}
        <div className="closeBtn"></div>
      </div>
      <div className="chatArea">
        {roomId ? <ChatRoom roomId={roomId} /> : <div className="intro"></div>}
      </div>
    </div>
  );
}
