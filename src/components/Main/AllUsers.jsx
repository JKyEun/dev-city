import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/profile.scss';

export default function AllUsers() {
  const [userInfo, setUserInfo] = useState({});
  return (
    <div className="profile">
      <img src="/images/icon_github.svg" alt="프로필 사진" width="98" />
      <div className="nickName">{userInfo.nickName}</div>
      <div className="userName">{userInfo.userName}</div>
      <span className="field">{userInfo.field}</span>
      <span className="level">Lv.{userInfo.level}</span>
      <hr />
      <div className="email">
        <div>✉️ Email</div>
        <div>{userInfo.email}</div>
      </div>
      <div className="github">
        <div>
          <img src="/images/icon_github.svg" alt="깃허브 아이콘" width="14" />{' '}
          Github
        </div>
        <div>{userInfo.githubAddress}</div>
      </div>
    </div>
  );
}
