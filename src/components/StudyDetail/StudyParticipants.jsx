import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
      <div className="profilePhoto">
        <img
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
        />
      </div>

      <div className="nickNameStudy">
        {userInfo?.nickName ? userInfo.nickName : '닉네임 정보없음'}
      </div>

      <div className="userNameStudy">
        {userInfo?.userName ? userInfo.userName : '이름 정보없음'}
      </div>
      <div className="userFieldLevel">
        <span className="fieldStudy">{userInfo?.field}</span>
        <span className="levelStudy">Lv.{userInfo?.level}</span>
      </div>
      <button className="btnFollowStudy">팔로우</button>
    </div>
  );
}
