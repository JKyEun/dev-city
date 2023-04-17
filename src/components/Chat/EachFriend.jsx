import React from 'react';
import { useSelector } from 'react-redux';

export default function EachFriend({ friend, setRoomId, setNowChattingWith }) {
  const userInfo = useSelector((state) => state.user);
  const arr = [userInfo.userId, friend.userId];
  const newRoomId = arr.sort();

  return (
    <li
      onClick={() => {
        setRoomId(newRoomId);
        setNowChattingWith(friend);
      }}
      className="member"
    >
      <div className="imgWrap">
        <img
          src={
            friend.profileImg || friend.profileImg !== ''
              ? friend.profileImg
              : '/images/default-profile.png'
          }
          alt="프로필 이미지"
        />
      </div>
      <div className="nickName">{friend.nickName}</div>
    </li>
  );
}
