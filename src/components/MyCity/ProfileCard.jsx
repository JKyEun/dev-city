import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../store/modules/user';

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
  const dispatch = useDispatch();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userInfo = useSelector((state) => state);
  const nameInput = useRef(null);
  const nickNameInput = useRef(null);
  const emailInput = useRef(null);
  const githubInput = useRef(null);
  const fieldInput = useRef(null);

  const handleLogoutClick = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e, 'asdf');
  };

  const saveProfileInfo = async (e, id) => {
    e.preventDefault();

    const newInfo = {
      ...userInfo,
      userName: nameInput.current.value,
      nickName: nickNameInput.current.value,
      email: emailInput.current.value,
      githubAddress: githubInput.current.value,
      field: fieldInput.current.value,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/user/updateuser/${id}`,
        newInfo,
      );
      console.log(res.data);
      dispatch(updateUser(newInfo));
    } catch (err) {
      console.error(err);
    }
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

  useEffect(() => {
    if (
      nameInput.current &&
      nickNameInput.current &&
      emailInput.current &&
      githubInput.current &&
      fieldInput.current
    ) {
      nameInput.current.value = userName;
      nickNameInput.current.value = nickName;
      emailInput.current.value = email;
      githubInput.current.value = githubAddress;
      fieldInput.current.value = field;
    }
  });

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
      {isModifyMode ? (
        <>
          <form
            onSubmit={(e) => {
              saveProfileInfo(e, localStorage.getItem('userId'));
              setIsModifyMode((cur) => !cur);
            }}
          >
            <div>
              <input
                ref={nameInput}
                id="nameInput"
                type="text"
                placeholder="이름"
              />
            </div>
            <div>
              <input
                ref={nickNameInput}
                id="nickNameInput"
                type="text"
                placeholder="닉네임"
              />
            </div>
            <div>
              <input
                ref={emailInput}
                id="emailInput"
                type="email"
                placeholder="이메일"
              />
            </div>
            <div>
              <input
                ref={githubInput}
                id="githubInput"
                type="text"
                placeholder="깃허브 주소"
              />
            </div>
            <div>
              <select ref={fieldInput} id="fieldInput" type="text">
                <option value="프론트엔드">프론트엔드</option>
                <option value="백엔드">백엔드</option>
                <option value="앱">앱</option>
                <option value="게임">게임</option>
                <option value="기획">기획</option>
              </select>
            </div>
            <button type="submit" className="hidden"></button>
          </form>
        </>
      ) : (
        <>
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
              <img
                src="/images/icon_github.svg"
                alt="깃허브 아이콘"
                width="14"
              />
              Github
            </div>
            <div>{githubAddress}</div>
          </div>
        </>
      )}

      <div className="flexBox-center editor">
        <a
          onClick={(e) => {
            setIsModifyMode((cur) => !cur);
            isModifyMode && saveProfileInfo(e, localStorage.getItem('userId'));
            handleSaveClick();
          }}
        >
          프로필 편집
        </a>
        <a onClick={handleLogoutClick}>로그아웃</a>
      </div>
    </div>
  );
}
