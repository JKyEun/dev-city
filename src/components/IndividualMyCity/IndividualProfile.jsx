import React from 'react';
import '../../style/profile.scss';
import IndividualProfileCard from './IndividualProfileCard';

export default function IndividualProfile({ individualInfo }) {
  return (
    <IndividualProfileCard
      individualInfo={individualInfo}
      nickName={individualInfo.nickName}
      userName={individualInfo.userName}
      field={individualInfo.field}
      level={individualInfo.level}
      email={individualInfo.email}
      githubAddress={individualInfo.githubAddress}
    />
  );
}
