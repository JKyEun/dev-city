import React, { useEffect, useState } from 'react';
import { getUser } from '../../apis/user';

export default function IndividualProfileCard({
  individualInfo,
  nickName,
  userName,
  field,
  level,
  email,
  githubAddress,
}) {
  const [profileImgUpdate, setProfileImgUpdate] = useState(null);
  const userId = individualInfo.userId;

  const fetchUserData = async () => {
    try {
      const res = await getUser(userId);
      setProfileImgUpdate(res.profileImg ? `/${res.profileImg}` : null);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile">
      <div className="profileBox">
        <div>
          <img
            className="profilePhoto"
            src={
              profileImgUpdate?.includes('/http')
                ? profileImgUpdate.replace('/', '')
                : !profileImgUpdate
                ? '/images/default-profile.png'
                : `${
                    process.env.REACT_APP_API_URL
                  }/uploads/${profileImgUpdate?.replace('/', '')}`
            }
            name="img"
            alt="프로필 사진"
          />
        </div>
      </div>

      <div className="edit">
        <input
          id="profileImgInput"
          name="img"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      <div className="nickName">{nickName}</div>
      <div className="userName">{userName}</div>
      <span className="field">{field}</span>
      <span className="level">Lv.{level}</span>
      <hr />
      <div className="email address">
        <div>✉️ Email</div>
        <a href={`mailto:${email}`} target="_blank">
          {email}
        </a>
      </div>
      <div className="github address">
        <div>
          <img src="/images/icon_github.svg" alt="깃허브 아이콘" width="14" />
          Github
        </div>
        <a href={githubAddress} target="_blank">
          {githubAddress}
        </a>
      </div>
    </div>
  );
}
