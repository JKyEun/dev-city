import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherSide, setRoomId } from '../../store/modules/chat';

export default function EachFriend({ friend }) {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setRoomIdAndOtherSide = () => {
    const arr = [userInfo.userId, friend.userId];
    const newRoomId = arr.sort();
    dispatch(setRoomId(newRoomId));
    dispatch(setOtherSide(friend));
  };

  return (
    <>
      {userInfo && (
        <li
          onClick={() => {
            setRoomIdAndOtherSide();
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
      )}
    </>
  );
}
