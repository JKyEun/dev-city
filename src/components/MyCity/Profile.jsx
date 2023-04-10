import React, { useEffect } from 'react';
import axios from 'axios';
import '../../style/profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '../../store/modules/user';

export default function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      dispatch(init(res.data));
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
