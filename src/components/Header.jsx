import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/_header.scss';
import HeaderDropdown from './HeaderDropdown';

export default function Header() {
  const [url, setUrl] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const headerTitle = {
    mycity: '나의 도시',
    todo: '나의 할일',
    create: '생성하기',
    study: '스터디',
    faq: 'FAQ',
  };

  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('JWT');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있다면 로그인 상태로 변경
    } else {
      setIsLoggedIn(false); // 토큰이 없다면 로그아웃 상태로 변경
    }
  }, []);

  // profile 클릭시 드롭다운

  const [showDropdown, setShowDropdown] = useState(false);

  const handleImageClick = () => {
    setShowDropdown(!showDropdown); // showDropdown 값을 반전시킴
  };

  return (
    <header>
      <div className="minMax">
        <div className="flexBox-between mainHeader">
          <div className="flexBox">
            <h1>
              <img src="" alt="logo" />
            </h1>
            <ul className="flexBox-between navigation">
              <li className={url === '/mycity' && 'pageIn'}>
                <Link to={'/mycity'}>나의 도시</Link>
              </li>
              <li className={url === '/study' && 'pageIn'}>
                <Link to={'/study'}>스터디</Link>
              </li>
              <li className={url === '/faq' && 'pageIn'}>
                <Link to={'/faq'}>FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="flexBox">
            <div className="search">
              <input type="text" placeholder="스터디 / 챌린지를 검색해주세요" />
            </div>
            {/* 로그인 유무 */}
            {isLoggedIn ? (
              <div>
                <div className="profileImg">
                  <img src="" alt="profile" onClick={handleImageClick} />
                  {showDropdown && <HeaderDropdown />}
                </div>
              </div>
            ) : (
              <div className="flexBox">
                <div className="login">
                  <Link to={'/signin'}>로그인</Link>
                </div>
                <div className="join">
                  <Link to={'/signup'}>회원가입</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="location">
        <div className="minMax">
          <Link to={'/'}>
            <img src="/images/icon_home.svg" alt="home" />
          </Link>
          <p>
            {url.split('/')[1] ? headerTitle[url.split('/')[1]] : '데브시티'}
          </p>
          <p>{url.split('/')[2] && headerTitle[url.split('/')[2]]}</p>
        </div>
      </div>
    </header>
  );
}
