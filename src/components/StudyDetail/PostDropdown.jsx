import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/postDropdown.scss';
import { useDispatch, useSelector } from 'react-redux';
import { convertOpen, setOtherSide } from '../../store/modules/chat';

export default function PostDropdown({ writerInfo }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const isFollowing = userInfo.following.filter(
    (el) => el.userId === writerInfo.userId,
  );
  const isFollowed = userInfo.follower.filter(
    (el) => el.userId === writerInfo.userId,
  );
  let isFriend = false;

  if (isFollowing.length > 0 && isFollowed.length > 0) {
    isFriend = true;
  }

  const setChatting = () => {
    dispatch(convertOpen());
    dispatch(setOtherSide(writerInfo));
  };

  return (
    <>
      <div className="postDropdown">
        <ul>
          {isFriend && (
            <li>
              <span onClick={setChatting}>1:1 채팅</span>
            </li>
          )}
          <li>
            <Link to={`/mycity/${writerInfo.userId}`}>정보 보기</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
