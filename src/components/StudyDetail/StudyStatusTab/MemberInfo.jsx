import React from 'react';
import '../../../style/memberInfo.scss';

export default function MemberInfo({ data }) {
  console.log(data);
  return (
    <div className="study_status-profile">
      <div className="study_status-profile_photo">
        <img
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
        />
      </div>

      <div className="study_status-profile_nickname">
        <p>{data?.nickName ? data.nickName : '닉네임 정보없음'}</p>
        <p>{`Lv.${data.level}  |  ${data.field}`}</p>
      </div>
    </div>
  );
}
