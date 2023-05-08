import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GithubActivity from './GithubActivity';
import TodoListStatus from './TodoListStatus';
import MemberInfo from './MemberInfo';
import '../../../style/studyStatus.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../../apis/user';

export default function StudyStatus() {
  const members = useSelector((state) => state.studyDetail.study.member);
  const [membersData, setMembersData] = useState([]);

  const userId = localStorage.getItem('userId');
  const isMember = useSelector((state) =>
    state.studyDetail.study.member.some((member) => member.memberId === userId),
  );

  useEffect(() => {
    async function fetchMembersData() {
      const requests = members.map((member) => getUser(member.memberId));
      const responses = await Promise.all(requests);
      const data = responses.map((response) => response);
      setMembersData(data);
    }
    fetchMembersData();
  }, [members]);

  return (
    <div className="lockContainer">
      {isMember ? null : (
        <div className="lockIconWrap">
          <FontAwesomeIcon icon={faLock} />
          <h2>조회 권한이 없습니다</h2>
        </div>
      )}
      {membersData.map((memberData, index) => (
        <div
          className="studyStatusWrapContainer"
          style={{
            filter: isMember ? 'none' : 'blur(10px)',
            pointerEvents: isMember ? 'auto' : 'none',
            userSelect: isMember ? 'auto' : 'none',
          }}
        >
          <div key={index} className="study_status">
            <MemberInfo data={memberData} />
            <GithubActivity data={memberData} />
            <TodoListStatus data={memberData} />
          </div>
        </div>
      ))}
    </div>
  );
}
