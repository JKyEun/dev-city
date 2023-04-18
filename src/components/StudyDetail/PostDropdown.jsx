import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/postDropdown.scss';

export default function PostDropdown() {
  return (
    <>
      <div className="postDropdown">
        <ul>
          <li>
            <Link to={'/mycity'}>1:1 채팅</Link>
          </li>
          <li>
            <Link to={'/mycity'}>정보 보기</Link>
          </li>
        </ul>
      </div>
    </>
  );
}