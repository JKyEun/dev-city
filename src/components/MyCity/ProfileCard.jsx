import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({
  profileImg,
  nickName,
  userName,
  field,
  level,
  email,
  githubAddress,
}) {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  const handleImageChange = (e) => {
    console.log(e);
  };

  return (
    <div className="profile">
      <div className="profileBox">
        <img
          className="profilePhoto"
          src={profileImg ? profileImg : '/images/default-profile.png'}
          alt="프로필 사진"
        />
      </div>
      <div onClick={handleImageChange} className="editIcon">
        <img src="/images/editIcon.svg" alt="" />
      </div>
      <div className="nickName">{nickName}</div>
      <div className="userName">{userName}</div>
      <span className="field">{field}</span>
      <span className="level">Lv.{level}</span>
      <hr />
      <div className="email address">
        <div>✉️ Email</div>
        <div>{email}</div>
      </div>
      <div className="github address">
        <div>
          <img src="/images/icon_github.svg" alt="깃허브 아이콘" width="14" />
          Github
        </div>
        <div>{githubAddress}</div>
      </div>

      <div className="flexBox-center editor">
        <a>프로필편집</a>
        <a onClick={handleLogoutClick}>로그아웃</a>
      </div>
    </div>
  );
}
