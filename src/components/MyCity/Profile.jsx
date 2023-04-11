import React from 'react';
import '../../style/profile.scss';
import { useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';

export default function Profile() {
  const userInfo = useSelector((state) => state.user);

  return (
    <ProfileCard
      nickName={userInfo.nickName}
      userName={userInfo.userName}
      field={userInfo.field}
      level={userInfo.level}
      email={userInfo.email}
      githubAddress={userInfo.githubAddress}
    />
  );
}
