import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';
import '../style/_header.scss';
import Chat from './Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { convertOpen, setOtherSide } from '../store/modules/chat';
import { getUser } from '../apis/user';

export default function Header() {
  const [url, setUrl] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useRef();
  const [profileImgUpdate, setProfileImgUpdate] = useState(null);
  const isChatOpen = useSelector((state) => state.chat.isChatOpen);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await getUser(userId);
      setProfileImgUpdate(res?.profileImg ? `/${res?.profileImg}` : null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUrl(location.pathname);
    fetchUserData();
  }, [location]);

  const headerTitle = {
    mycity: '나의 도시',
    todo: '나의 할일',
    create: '생성하기',
    study: '스터디',
    faq: 'FAQ',
    signin: '로그인',
    signup: '회원가입',
    information: '추가정보입력',
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
  // 드롭다운 포커스 아웃되면 다시 사라지기

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  const handleImgClick = () => {
    setShowDropdown(!showDropdown); // showDropdown 값을 반전시킴
  };
  const handleSearch = (e) => {
    if (url !== '/study') {
      navigate('/study');
    }
    searchInput.current.value
      ? navigate(`/study?search=${searchInput.current.value}`)
      : navigate('/study');
  };

  return (
    <header>
      <div className="minMax">
        <div className="flexBox-between mainHeader">
          <div className="flexBox">
            <h1>
              <Link to="/">
                <img src="/images/logo.svg" alt="logo" />
              </Link>
            </h1>
            <ul className="flexBox-between navigation">
              <li className={url === '/mycity' && 'pageIn'}>
                <Link to={'/mycity'}>나의 도시</Link>
              </li>
              <li className={url === '/study' && 'pageIn'}>
                <Link to={'/study'}>스터디</Link>
              </li>
              {/* <li className={url === '/faq' && 'pageIn'}>
                <Link to={'/faq'}>FAQ</Link>
              </li> */}
            </ul>
          </div>
          <div className="flexBox">
            <div className="search">
              <input
                onKeyUp={handleSearch}
                ref={searchInput}
                type="text"
                placeholder="찾으시는 스터디가 있으신가요?"
              />
              <div type="submit" className="searchIcon" onClick={handleSearch}>
                <img src="/images/icon_search.svg" alt="search" />
              </div>
            </div>
            <div className="buttons">
              <div>
                <Link to="/mycity">
                  <img src="/images/icon_heart.svg" alt="관심스터디" />
                </Link>
              </div>
              <div
                onClick={() => {
                  if (!localStorage.getItem('userId')) {
                    navigate('/signin');
                  } else {
                    dispatch(convertOpen());
                    dispatch(setOtherSide(null));
                  }
                }}
              >
                <img src="/images/icon_message.svg" alt="다이렉트 메시지" />
              </div>
              <div>
                <Link to="/mycity?lo=todo">
                  <img src="/images/icon_calendar.svg" alt="나의 할 일" />
                </Link>
              </div>
            </div>
            {/* 로그인 유무 */}
            {isLoggedIn ? (
              <div ref={dropdownRef}>
                <div className="profileImg" onClick={handleImgClick}>
                  <img
                    src={
                      profileImgUpdate?.includes('/http')
                        ? profileImgUpdate.replace('/', '')
                        : !profileImgUpdate
                        ? '/images/default-profile.png'
                        : `${
                            process.env.REACT_APP_API_URL
                          }/uploads/${profileImgUpdate?.replace('/', '')}`
                    }
                    alt="profile"
                  />
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
      {isChatOpen && <Chat />}
    </header>
  );
}
