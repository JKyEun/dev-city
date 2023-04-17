import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function EachUser({ eachUser }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [num, setNum] = useState(1);
  const userInfo = useSelector((state) => state.user);

  const follow = async () => {
    try {
      // userInfo의 following 배열에 추가
      const newFollowing = [
        ...userInfo.following,
        {
          userId: eachUser.userId,
          nickName: eachUser.nickName,
          profileImg: eachUser.profileImg,
        },
      ];

      const newUserInfo = {
        ...userInfo,
        following: newFollowing,
      };

      const userInfoRes = await axios.post(
        `http://localhost:4000/user/updateuser/${userInfo.userId}`,
        newUserInfo,
      );
      console.log(userInfoRes.data);

      // eachUser의 follower 배열에 추가
      const newFollower = [
        ...eachUser.follower,
        {
          userId: userInfo.userId,
          nickName: userInfo.nickName,
          profileImg: userInfo.profileImg,
        },
      ];

      const newEachUser = {
        ...eachUser,
        follower: newFollower,
      };

      const eachUserRes = await axios.post(
        `http://localhost:4000/user/updateuser/${eachUser.userId}`,
        newEachUser,
      );
      console.log(eachUserRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const unFollow = async (id) => {
    try {
      // userInfo의 following 배열에서 삭제
      const newFollowing = userInfo.following.filter(
        (el) => el.userId !== eachUser.userId,
      );

      const newUserInfo = {
        ...userInfo,
        following: newFollowing,
      };

      console.log(newFollowing);

      const userInfoRes = await axios.post(
        `http://localhost:4000/user/updateuser/${userInfo.userId}`,
        newUserInfo,
      );
      console.log(userInfoRes.data);

      // eachUser의 follower 배열에서 삭제
      const newFollower = eachUser.follower.filter(
        (el) => el.userId !== userInfo.userId,
      );

      const newEachUser = {
        ...eachUser,
        follower: newFollower,
      };

      const eachUserRes = await axios.post(
        `http://localhost:4000/user/updateuser/${eachUser.userId}`,
        newEachUser,
      );
      console.log(eachUserRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userInfo.following) return;

    for (let i = 0; i < userInfo.following.length; i++) {
      if (userInfo.following[i].userId === eachUser.userId) {
        setIsFollowing(true);
        setNum(0);
      }
    }
  }, [userInfo]);

  return (
    <div className="profile" key={eachUser.userId}>
      <div>
        <div className="profileImg">
          <img
            src={
              eachUser.profileImg
                ? eachUser.profileImg
                : '/images/default-profile.png'
            }
            alt="프로필 사진"
            width="98"
          />
        </div>
        <div className="nickName">{eachUser.nickName}</div>
        <span className="field">{eachUser.field}</span>
        <span className="level">{`Lv.${eachUser.level}`}</span>
        <div className="friend">
          <span className="follow">
            Follower
            <span>
              {isFollowing
                ? eachUser.follower.length + num
                : eachUser.follower.length + (num - 1)}
            </span>
          </span>
          <span className="following">
            Following
            <span>{eachUser.following.length}</span>
          </span>
        </div>
        {isFollowing ? (
          <button
            onClick={() => {
              setIsFollowing((cur) => !cur);
              unFollow();
            }}
            className="followed"
          >
            팔로잉
          </button>
        ) : (
          <button
            onClick={() => {
              setIsFollowing((cur) => !cur);
              follow();
            }}
            className="btnFollow"
          >
            팔로우
          </button>
        )}
      </div>
    </div>
  );
}
