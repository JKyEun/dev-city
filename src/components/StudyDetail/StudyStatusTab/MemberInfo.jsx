import React from 'react';
import '../../../style/memberInfo.scss';

export default function MemberInfo({ data }) {
  return (
    <>
      <div className="study_status-profile">
        <img
          className="study_status-profile_photo"
          src={
            data?.profileImg?.includes('http')
              ? data?.profileImg
              : !data?.profileImg
              ? '/images/default-profile.png'
              : `http://localhost:4000/uploads/${data?.profileImg?.replace(
                  '/',
                  '',
                )}`
          }
          alt="프로필 사진"
          width="98"
          height="98"
        />

        <div className="study_status-profile_nickname">
          {data?.nickName ? data.nickName : '닉네임 정보없음'}
        </div>
      </div>
    </>
  );
}
