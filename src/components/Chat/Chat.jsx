import React from 'react';
import { useSelector } from 'react-redux';
import '../../style/chat.scss';
import EachStudy from './EachStudy';
import ChatRoom from './ChatRoom';

export default function Chat() {
  const myStudyList = useSelector((state) => state.user.joinedStudy);

  return (
    <div className="chat">
      <div className="friendList">
        {myStudyList && (
          <ul>
            {myStudyList.map((study) => (
              <EachStudy study={study} />
            ))}
          </ul>
        )}
      </div>
      <div className="chatArea">
        <ChatRoom />
      </div>
    </div>
  );
}
