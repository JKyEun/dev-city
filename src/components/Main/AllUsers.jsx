import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/allUsers.scss';

export default function AllUsers() {
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/allUser')
      .then((response) => {
        setRandomUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div className="part3">
        <div className="minMax">
          <div className="text">
            <div className="mainText">추천 친구</div>
            <div className="subText">비슷한 분야의 사람들을 팔로우해보세요</div>
          </div>
          <div className="flexBox">
            {randomUsers.map((user) => (
              <div className="profile">
                <div key={user.id}>
                  <img
                    src="/images/icon_github.svg"
                    alt="프로필 사진"
                    width="98"
                  />
                  <div className="nickName">{user.nickName}</div>
                  <span className="field">{user.field}</span>
                  <span className="level">{`Lv.${user.level}`}</span>
                  <div className="friend">
                    <span className="follow">
                      Follow<span>{/* {user.follower} */}10</span>
                    </span>
                    <span className="following">
                      Following<span>{/* {user.folloing} */}12</span>
                    </span>
                  </div>
                  <button className="btnFollow">팔로우</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
