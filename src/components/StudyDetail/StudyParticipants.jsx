import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function StudyParticipants({ study }) {
  console.log(study);
  return (
    <div>
      <div className="profileBox">
        <img
          className="profilePhoto"
          src={
            study.profileImg ? study.profileImg : '/images/default-profile.png'
          }
          alt="프로필 사진"
        />
      </div>
      <div className="nickName">{study.nickName}</div>
      <div className="userName">{study.userName}</div>
      <div>
        <span className="field">{study.field}</span>
        <span className="level">Lv.{study.level}</span>
      </div>
      <button className="btnFollow">팔로우</button>
    </div>
  );
}
