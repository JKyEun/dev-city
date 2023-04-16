import React from 'react';
import { useSelector } from 'react-redux';
import EachStudy from './EachStudy';

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
      <div className="chatArea"></div>
    </div>
  );
}
