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
  const userInfo = useSelector((state) => state.user);
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

  // 프로필 수정하기
  const [profileImgUpdate, setProfileImgUpdate] = useState(null);

  const uploadImg = async (e, id) => {
    console.log(id);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('img', file);
    try {
      const res = await axios.post(
        `http://localhost:4000/user/updateuser/images/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log(res.data.profileImg);
      setProfileImgUpdate(`/uploads/${res.data.profileImg}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // 로컬 스토리지에서 userId 가져오기
    const userId = localStorage.getItem('userId');

    // 유저 정보 가져오기
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user/${userId}`);
        setProfileImgUpdate(`/uploads/${res.data.profileImg}`);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="profile">
      <div className="profileBox">
        <div>
          <img
            className="profilePhoto"
            src={
              profileImgUpdate
                ? `${profileImgUpdate}`
                : '/images/default-profile.png'
            }
            name="img"
            alt="프로필 사진"
          />
        </div>
      </div>

      <div className="edit">
        <label htmlFor="profileImgInput" className="editIcon">
          <img src="/images/editIcon.svg" alt="" />
        </label>
        <input
          id="profileImgInput"
          name="img"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => uploadImg(e, localStorage.getItem('userId'))}
        />
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
          }}
        >
          프로필 편집
        </a>
        <a onClick={handleLogoutClick}>로그아웃</a>
      </div>
    </div>
  );
}
