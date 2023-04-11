import React from 'react';

export default function ProfileCard({
  nickName,
  userName,
  field,
  level,
  email,
  githubAddress,
}) {
  return (
    <div className="profile">
      <img src="/images/icon_github.svg" alt="프로필 사진" width="98" />
      <div className="nickName">{nickName}</div>
      <div className="userName">{userName}</div>
      <span className="field">{field}</span>
      <span className="level">Lv.{level}</span>
      <hr />
      <div className="email">
        <div>✉️ Email</div>
        <div>{email}</div>
      </div>
      <div className="github">
        <div>
          <img src="/images/icon_github.svg" alt="깃허브 아이콘" width="14" />
          Github
        </div>
        <div>{githubAddress}</div>
      </div>
    </div>
  );
}
