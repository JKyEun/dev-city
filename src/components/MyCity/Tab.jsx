import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../style/tab.scss';
export default function Tab(props) {
  const [url, setUrl] = useState('/');
  const location = useLocation();
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <div className='tab'>
      <ul className='flexBox tabBox'>
        <li className={url === '/mycity' && 'onPage'}>
          <Link to={'/mycity'}>나의 스터디</Link>
        </li>
        <li className={url === '/mycity/todo' && 'onPage'}>
          <Link to={'/mycity'}>나의 할일 목록</Link>
        </li>
      </ul>
    </div>
  );
}
