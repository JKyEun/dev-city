import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../MyCity/ProfileCard';
import { useSelector } from 'react-redux';

export default function EditProfile({
  profileImg,
  nickName,
  userName,
  field,
  level,
  email,
  githubAddress,
}) {
  // 로그아웃
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  const userInfo = useSelector((state) => state.user);
  // 프로필 수정
  const [isEdit, setIsEdit] = useState(false);
  const [editNickName, setEditNickName] = useState(userInfo.nickName);

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleEditSave = () => {
    // Send edited profile data to server
    setIsEdit(false);
  };

  const handleEditCancel = () => {
    setEditNickName(userInfo.nickName);
    setIsEdit(false);
  };

  const renderNickName = () => {
    if (isEdit) {
      return (
        <input
          type="text"
          value={editNickName}
          onChange={(e) => setEditNickName(e.target.value)}
        />
      );
    } else {
      return <div className="nickName">{userInfo.nickName}</div>;
    }
  };

  const renderEditBtn = () => {
    if (isEdit) {
      return (
        <div>
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </div>
      );
    } else {
      return <button onClick={handleEditClick}>프로필 수정</button>;
    }
  };
  return (
    <>
      <ProfileCard
        profileImg={userInfo.profileImg}
        nickName={renderNickName()}
        userName={userInfo.userName}
        field={userInfo.field}
        level={userInfo.level}
        email={userInfo.email}
        githubAddress={userInfo.githubAddress}
      ></ProfileCard>
      <div>
        {renderEditBtn()}
        <button onClick={handleLogoutClick}>로그아웃</button>
      </div>
    </>
  );
}
