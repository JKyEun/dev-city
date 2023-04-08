import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      setUserInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo("jke");
  }, []);

  return (
    <div className="profile">
      <img />
      <div>{userInfo.nickName}</div>
      <div>{userInfo.name}</div>
      <span>{userInfo.interest}</span>
      <span>Lv.{userInfo.level}</span>
      <hr />
      <div>
        <div>✉️ Email</div>
        <div>{userInfo.email}</div>
      </div>
      <div>
        <div>🐈‍⬛ Github</div>
        <div>{userInfo.githubAddress}</div>
      </div>
    </div>
  );
}
