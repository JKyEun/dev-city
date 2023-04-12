import React from 'react';
import '../style/_headerDropdown.scss';
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderDropdown() {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('userId');
    window.location.reload();
    navigate('/');
  };
  return (
    <>
      <div className="dropdown">
        <ul>
          <div>
            <div onClick={handleLogoutClick}>로그아웃</div>
          </div>
          <li>
            <Link to={'/mycity'}>나의 스터디</Link>
          </li>
          <li>
            <Link to={'/mycity'}>나의 할일</Link>
          </li>
        </ul>
        <hr />
      </div>
    </>
  );
}
