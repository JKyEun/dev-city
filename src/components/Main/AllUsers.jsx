import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/profile.scss';
import '../../style/allUsers.scss';
import Profile from '../MyCity/Profile';
import ProfileCard from '../MyCity/ProfileCard';
export default function AllUsers() {
  // const [randomUers, setRandomUsers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:4000/allUser')
  //     .then((response) => {
  //       setRandomUsers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  return (
    <>
      <ProfileCard />
      {/* {randomUers.map((randomUers) => (
        <div key={randomUers._id}>
          <div className="profile">
            <img src="/images/icon_github.svg" alt="프로필 사진" width="98" />
            <div className="nickName">{randomUers.nickName}</div>
            <div className="userName">{randomUers.userName}</div>
            <span className="field">{randomUers.field}</span>
            <span className="level">Lv.{randomUers.level}</span>
            <hr />
            <div className="email">
              <div>✉️ Email</div>
              <div>{randomUers.email}</div>
            </div>
            <div className="github">
              <div>
                <img
                  src="/images/icon_github.svg"
                  alt="깃허브 아이콘"
                  width="14"
                />
                Github
              </div>
              <div>{randomUers.githubAddress}</div>
            </div>
          </div>
        </div>
      ))} */}
    </>
  );
}
