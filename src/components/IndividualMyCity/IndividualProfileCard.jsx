import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../store/modules/user';

export default function IndividualProfileCard({
  individualInfo,
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
  const [profileImgUpdate, setProfileImgUpdate] = useState(null);
  const userId = individualInfo.userId;
  const userInfo = individualInfo;
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
      userName: nameInput.current.value
        ? nameInput.current.value
        : '이름을 설정하세요',
      nickName: nickNameInput.current.value
        ? nickNameInput.current.value
        : '닉네임을 설정하세요',
      email: emailInput.current.value
        ? emailInput.current.value
        : '이메일을 설정하세요',
      githubAddress: githubInput.current.value
        ? githubInput.current.value
        : '깃험 주소를 설정하세요',
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

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${userId}`);
      setProfileImgUpdate(
        res.data.profileImg ? `/${res.data.profileImg}` : null,
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile">
      <div className="profileBox">
        <div>
          <img
            className="profilePhoto"
            src={
              profileImgUpdate?.includes('/http')
                ? profileImgUpdate.replace('/', '')
                : !profileImgUpdate
                ? '/images/default-profile.png'
                : `http://localhost:4000/uploads/${profileImgUpdate?.replace(
                    '/',
                    '',
                  )}`
            }
            name="img"
            alt="프로필 사진"
          />
        </div>
      </div>

      <div className="edit">
        <input
          id="profileImgInput"
          name="img"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
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
            <a href={`mailto:${email}`} target="_blank">
              {email}
            </a>
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
            <a href={githubAddress} target="_blank">
              {githubAddress}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
