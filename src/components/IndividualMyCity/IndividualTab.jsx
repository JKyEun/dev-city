import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../style/tab.scss';
import IndividualStudy from './IndividualStudy';
import IndividualTodoListTab from './IndividualTodoListTab';

export default function IndividualTab({ individualInfo }) {
  const [tab, setTab] = useState('study');
  const location = useLocation();

  useEffect(() => {
    location.search.includes('lo=todo') && setTab('todo');
  }, [location]);

  return (
    <div className="tab">
      <ul className="flexBox tabBox">
        <li className={tab === 'study' ? 'onPage' : ''}>
          <p onClick={() => setTab('study')}>나의 스터디</p>
        </li>
        <li className={tab === 'todo' ? 'onPage' : ''}>
          <p onClick={() => setTab('todo')}>나의 할 일</p>
        </li>
      </ul>
      {tab === 'study' ? (
        <IndividualStudy individualInfo={individualInfo} />
      ) : (
        <IndividualTodoListTab individualInfo={individualInfo} />
      )}
    </div>
  );
}
