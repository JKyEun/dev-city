import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GithubActivity from './GithubActivity';
import TodoListStatus from './TodoListStatus';
import MemberInfo from './MemberInfo';
import '../../../style/studyStatus.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function StudyStatus() {
  const members = useSelector((state) => state.studyDetail.study.member);
  const [membersData, setMembersData] = useState([]);

  const userId = localStorage.getItem('userId');
  const isMember = useSelector((state) =>
    state.studyDetail.study.member.some((member) => member.memberId === userId),
  );

  useEffect(() => {
    async function fetchMembersData() {
      const requests = members.map((member) =>
        axios.get(`http://localhost:4000/user/${member.memberId}`),
      );
      const responses = await Promise.all(requests);
      const data = responses.map((response) => response.data);
      setMembersData(data);
    }
    fetchMembersData();
  }, [members]);

  return (
    <>
      {membersData.map((memberData, index) => (
        <div className="studyStatusWrapContainer">
          {isMember ? null : (
            <div className="lockIconWrap">
              <FontAwesomeIcon icon={faLock} />
              <h2>권한이 없습니다</h2>
            </div>
          )}
          <div
            key={index}
            className="study_status"
            style={{
              filter: isMember ? 'none' : 'blur(10px)',
              pointerEvents: isMember ? 'auto' : 'none',
              userSelect: isMember ? 'auto' : 'none',
            }}
          >
            <MemberInfo className="user_info" data={memberData} />
            <GithubActivity className="github_activity" data={memberData} />
            <TodoListStatus className="todolist" data={memberData} />
          </div>
        </div>
      ))}
    </>
  );
}
