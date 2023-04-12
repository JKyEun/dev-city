import React from 'react';
import '../style/_headerDropdown.scss';
import { Link } from 'react-router-dom';

export default function HeaderDropdown() {
  // 로그아웃
  const handleLogoutClick = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('userId');
    window.location.reload();
  };

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
        <button onClick={handleLogoutClick} className="logout">
          로그아웃
        </button>
      </div>
    </>
  );
}
