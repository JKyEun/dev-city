import React from 'react';
import '../style/_headerDropdown.scss';
import { Link } from 'react-router-dom';
export default function HeaderDropdown() {
  return (
    <>
      <div className="dropdown">
        <ul>
          <li>
            <Link to={'/mycity'}>나의 스터디</Link>
          </li>
          <li>
            <Link to={'/mycity'}>나의 할일</Link>
          </li>
        </ul>
        <hr />
        <div>
          <Link to={'/'}>로그아웃</Link>
        </div>
      </div>
    </>
  );
}
