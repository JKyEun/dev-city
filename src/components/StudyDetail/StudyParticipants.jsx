import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { init } from '../../store/modules/user';

export default function StudyParticipants({ member }) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      dispatch(init(res.data));
      setUserInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo(member.memberId);
  }, []);

  return (
    <div>
      <div className="profileBox">
        <img
          className="profilePhoto"
          src={
            userInfo?.profileImg
              ? userInfo?.profileImg
              : '/images/default-profile.png'
          }
          alt="프로필 사진"
        />
      </div>
      <div className="nickName">{userInfo?.nickName}</div>
      <div className="userName">{userInfo?.userName}</div>
      <div>
        <span className="field">{userInfo?.field}</span>
        <span className="level">Lv.{userInfo?.level}</span>
      </div>
      <button className="btnFollow">팔로우</button>
    </div>
  );
}
