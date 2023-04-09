import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../style/tab.scss';
import Study from './Study';
import TodoListTab from './TodoListTab';

export default function Tab() {
  const [tab, setTab] = useState('study');
  const location = useLocation();

  useEffect(() => {
    location.search.includes('lo=todo') && setTab('todo');
  }, [location]);

  return (
    <div className="tab">
      <ul className="flexBox tabBox">
        <li className={tab === 'study' && 'onPage'}>
          <p onClick={() => setTab('study')}>나의 스터디</p>
        </li>
        <li className={tab === 'todo' && 'onPage'}>
          <p onClick={() => setTab('todo')}>나의 할일 목록</p>
        </li>
      </ul>
      {tab === 'study' ? <Study /> : <TodoListTab />}
    </div>
  );
}
