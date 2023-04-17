import React from 'react';
import { useSelector } from 'react-redux';

export default function EachFriend({ friend, setRoomId }) {
  const userInfo = useSelector((state) => state.user);
  const arr = [userInfo.userId, friend.userId];
  const newRoomId = arr.sort();

  return (
    <li onClick={() => setRoomId(newRoomId)} className="member">
      {friend.userId}
    </li>
  );
}
