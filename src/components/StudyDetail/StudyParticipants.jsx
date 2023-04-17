import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { init } from '../../store/modules/user';
import '../../style/studyProfile.scss';

export default function StudyParticipants({ member }) {
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      setUserInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo(member.memberId);
  }, []);
  return (
    <div className="studyProfile">
      <div className="profile">
        <img
          className="profilePhoto"
          src={
            userInfo?.profileImg?.includes('http')
              ? userInfo?.profileImg
              : !userInfo?.profileImg
              ? '/images/default-profile.png'
              : `http://localhost:4000/uploads/${userInfo?.profileImg?.replace(
                  '/',
                  '',
                )}`
          }
          alt="프로필 사진"
          width="98"
          height="98"
        />

        <div className="nickNameStudy">{userInfo?.nickName}</div>
        <div className="userNameStudy">{userInfo?.userName}</div>
        <div>
          <span className="fieldStudy">{userInfo?.field}</span>
          <span className="levelStudy">Lv.{userInfo?.level}</span>
        </div>
        <button className="btnFollowStudy">팔로우</button>
      </div>
    </div>
  );
}
