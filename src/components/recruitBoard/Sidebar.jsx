import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../store/modules/study';
import '../../style/recruitBoard/Sidebar.scss';
export default function Sidebar() {
  const status = useSelector((state) => state.study.status);
  const dispatch = useDispatch();
  const handleSelectStatus = (status) => {
    dispatch(setStatus(status));
  };
  return (
    <ul className="sidebar">
      <li className={`sidebar_category ${status === 'all' ? 'selected' : ''}`}>
        <span onClick={() => handleSelectStatus('all')}>전체</span>
      </li>
      <li
        className={`sidebar_category ${
          status === 'recruiting' ? 'selected' : ''
        }`}
      >
        <span onClick={() => handleSelectStatus('recruiting')}>모집 중</span>
      </li>
      <li
        className={`sidebar_category ${status === 'closed' ? 'selected' : ''}`}
      >
        <span onClick={() => handleSelectStatus('closed')}>모집완료</span>
      </li>
    </ul>
  );
}
