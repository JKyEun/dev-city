import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/_footer.scss';
export default function Footer() {
  const [url, setUrl] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <footer>
      <div className="minMax">
        <div className="flexBox">
          <h1>
            <img src="" alt="logo" />
          </h1>
          <div className="pageInfo">
            <div className="footerLink">
              <ul className="flexBox-between navigation">
                <li className={url === '/mycity' && 'pageIn'}>
                  <Link to={'/mycity'}>나의 도시</Link>
                </li>
                <li className={url === '/study' && 'pageIn'}>
                  <Link to={'/study'}>스터디</Link>
                </li>
              </ul>
            </div>
            <hr />
            <div className="pageInfo">
              <p>
                <strong>github</strong>
                <a href="https://github.com/JKyEun/dev-city" target="_blank">
                  https://github.com/JKyEun/dev-city
                </a>
              </p>
              <p>
                © Copyright.2023.Dev-city |
                <a href="https://github.com/minjeong19" target="_blank">
                  김민정
                </a>
                ·
                <a href="https://github.com/KingJiwon" target="_blank">
                  박지원
                </a>
                ·
                <a href="https://github.com/ssb1565b" target="_blank">
                  송수빈
                </a>
                ·
                <a href="https://github.com/JKyEun" target="_blank">
                  장경은
                </a>
                ·
                <a href="https://github.com/HeeHeeHee-github" target="_blank">
                  조성희
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
