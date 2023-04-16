import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';
import '../../style/profile.scss';

export default function Profile() {
  const userInfo = useSelector((state) => state.user);

  return (
    <ProfileCard
      profileImg={userInfo.profileImg}
      nickName={userInfo.nickName}
      userName={userInfo.userName}
      field={userInfo.field}
      level={userInfo.level}
      email={userInfo.email}
      githubAddress={userInfo.githubAddress}
    />
  );
}
