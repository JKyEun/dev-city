import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({
  profileImg,
  nickName,
  userName,
  field,
  level,
  email,
  githubAddress,
}) {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e, 'asdf');
  };

  const handleSaveClick = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profileImg', selectedFile);
      formData.append('_id', localStorage.getItem('userId'));
      try {
        const response = await axios.post(
          'http://localhost:4000/user/updateImg',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('JWT')}`,
            },
          },
        );
        console.log(response.data); // 프로필 사진 변경 성공
      } catch (err) {
        console.error(err); //프로필 변경 실패
      }
    }
  };
  return (
    <div className="profile">
      <div className="profileBox">
        <img
          className="profilePhoto"
          src={profileImg ? profileImg : '/images/default-profile.png'}
          alt="프로필 사진"
        />

        {/* </div>
      <div onClick={handleImageChange} className="editIcon">
        <img src="/images/editIcon.svg" alt="" />
      </div> */}
      </div>
      <div className="editIcon">
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="profileImgInput"
        /> */}
        <label htmlFor="profileImgInput" className="editIcon">
          <img src="/images/editIcon.svg" alt="" />
        </label>
      </div>
      <div className="nickName">{nickName}</div>
      <div className="userName">{userName}</div>
      <span className="field">{field}</span>
      <span className="level">Lv.{level}</span>
      <hr />
      <div className="email address">
        <div>✉️ Email</div>
        <div>{email}</div>
      </div>
      <div className="github address">
        <div>
          <img src="/images/icon_github.svg" alt="깃허브 아이콘" width="14" />
          Github
        </div>
        <div>{githubAddress}</div>
      </div>

      <div className="flexBox-center editor">
        <a onClick={handleSaveClick}>프로필편집</a>
        <a onClick={handleLogoutClick}>로그아웃</a>
      </div>
    </div>
  );
}
