import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../store/modules/user';
import { getUser, updateUserImg, updateUserInfo } from '../../apis/user';

export default function ProfileCard({
  profileImg,
  nickName,
  userName,
  field,
  level,
  phoneNumber,
  email,
  githubAddress,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [profileImgUpdate, setProfileImgUpdate] = useState(null);
  const userId = localStorage.getItem('userId');
  const userInfo = useSelector((state) => state.user);
  const nameInput = useRef(null);
  const phoneInput = useRef(null);
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
    const regex = /^\d{3}\d{4}\d{4}$/;
    console.log(
      !phoneInput.current.value,
      regex.test(phoneInput.current.value),
    );
    if (!phoneInput.current.value) {
      alert('휴대폰 번호를 필수로 입력해주세요');
      return;
    } else if (!regex.test(phoneInput.current.value)) {
      alert('01012345678 형식으로 입력해주세요');
      return;
    } else {
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
        phoneNumber: phoneInput.current.value.replaceAll('-', ''),
      };

      try {
        await updateUserInfo(id, newInfo);
        dispatch(updateUser(newInfo));
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (
      nameInput.current &&
      nickNameInput.current &&
      emailInput.current &&
      githubInput.current &&
      fieldInput.current &&
      phoneInput.current
    ) {
      nameInput.current.value = userName;
      nickNameInput.current.value = nickName;
      emailInput.current.value = email;
      githubInput.current.value = githubAddress;
      fieldInput.current.value = field;
      phoneInput.current.value = phoneNumber;
    }
  });

  // 프로필 수정하기
  const uploadImg = async (e, id) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('img', file);
    try {
      const res = await updateUserImg(id, formData);
      setProfileImgUpdate(`/${res.profileImg}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await getUser(userId);
      setProfileImgUpdate(res.profileImg ? `/${res.profileImg}` : null);
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
                : `${
                    process.env.REACT_APP_API_URL
                  }/uploads/${profileImgUpdate?.replace('/', '')}`
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
        <form
          onSubmit={(e) => {
            saveProfileInfo(e, localStorage.getItem('userId'));
            setIsModifyMode((cur) => !cur);
          }}
        >
          <div>
            <input
              ref={phoneInput}
              id="phoneInput"
              type="text"
              placeholder="필수로 입력해주세요"
              required
            />
          </div>
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
              <option value="기획">웹</option>
              <option value="앱">앱</option>
              <option value="게임">게임</option>
              <option value="기획">기획</option>
              <option value="AI">AI</option>
              <option value="데이터 분석">데이터 분석</option>
              <option value="블록체인">블록체인</option>
              <option value="보안">보안</option>
              <option value="임베디드">임베디드</option>
              <option value="임베디드">UX/UI</option>
            </select>
          </div>
          <button type="submit" className="hidden"></button>
        </form>
      ) : (
        <>
          <div className="nickName">
            {nickName ? nickName : '닉네임을 설정해주세요'}
          </div>
          <div className="userName">
            {userName ? userName : '이름을 설정해주세요'}
          </div>
          <span className="field">
            {field ? field : '관심분야를 설정해주세요'}
          </span>
          <span className="level">Lv.{level}</span>
          <hr />
          <div className="phone address">
            <div>
              <img src="/images/call.png" alt="" width="13" /> Phone
            </div>
            <a>{phoneNumber ? phoneNumber : '휴대폰 번호를 설정해주세요'}</a>
          </div>
          <div className="email address">
            <div>✉️ Email</div>
            <a href={`mailto:${email}`} target="_blank">
              {email ? email : '이메일을 설정해주세요'}
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
              {githubAddress ? githubAddress : '깃헙 메일을 설정해주세요'}
            </a>
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
