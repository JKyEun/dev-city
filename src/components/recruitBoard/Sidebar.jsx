import React from 'react';
import '../../style/recruitBoard/Sidebar.scss';
export default function Sidebar() {
  return (
    <ul className="sidebar">
      <li className="sidebar_category">
        <a href="/">전체</a>
      </li>
      <li className="sidebar_category">
        <a href="/">모집중</a>
      </li>
      <li className="sidebar_category">
        <a href="/">모집완료</a>
      </li>
    </ul>
  );
}
