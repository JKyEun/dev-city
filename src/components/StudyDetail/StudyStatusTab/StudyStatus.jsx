import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GithubActivity from './GithubActivity';
import TodoList from './TodoList';
import UserInfo from './UserInfo';

export default function StudyStatus() {
  const members = useSelector((state) => state.studyDetail.study.member);
  const [membersData, setMembersData] = useState([]);

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
        <div key={index} className="study_status">
          <UserInfo className="user_info" data={memberData} />
          <GithubActivity className="github_activity" data={memberData} />
          <TodoList className="todolist" data={memberData} />
        </div>
      ))}
    </>
  );
}