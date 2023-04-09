import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/profile.scss';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      setUserInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo('jke');
  }, []);

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
