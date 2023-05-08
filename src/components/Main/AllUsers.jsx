import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/allUsers.scss';
import EachUser from './EachUser';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../apis/main';

export default function AllUsers() {
  const [randomUsers, setRandomUsers] = useState([]);
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    const getUserFunc = async () => {
      const res = await getAllUser(userInfo.userId);
      setRandomUsers(res);
    };

    if (!userInfo.userId) return;
    getUserFunc();
  }, [userInfo]);

  return (
    <div className="part3">
      <div className="minMax">
        <div className="text">
          <div className="mainText">추천 친구</div>
          <div className="subText">비슷한 분야의 사람들을 팔로우해보세요</div>
        </div>
        <div className="flexBox">
          {randomUsers.map((eachUser) => (
            <EachUser key={eachUser.userId} eachUser={eachUser} />
          ))}
        </div>
      </div>
    </div>
  );
}
