import React, { useState, useEffect } from 'react';
import MyStudy from '../MyCity/MyStudy';
import ReadyStudy from '../Main/ReadyStudy';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { init } from '../../store/modules/study';
import '../../style/study.scss';

import axios from 'axios';
export default function Study() {
  const [num, setNum] = useState(0);
  const userInfo = useSelector((state) => state.user);
  const [likeStudy, setLikeStudy] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getStudyInfo = async () => {
    try {
      const resStudy = await axios.get(`http://localhost:4000/study/`);
      dispatch(init(resStudy.data));
      const id = localStorage.getItem('userId');
      const resUser = await axios.get(`http://localhost:4000/user/${id}`);
      const result = resStudy.data?.filter((study) => {
        return resUser.data?.likedStudy?.includes(study._id);
      });
      setLikeStudy(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStudyInfo();
    if (!localStorage.getItem('userId')) {
      navigate('/signin');
    }
  }, []);

  return (
    <div className="studyTab">
      <div className="buildingBox">
        <img className="bg" src="/images/building-bg.svg" alt="bg" />
        {userInfo?.joinedStudy?.map((el, idx) => {
          const date = new Date(el.createDate);
          return (
            <div
              key={idx}
              className={`building building${el.buildingLocation}`}
            >
              <div className="contentBox">
                <div
                  className={
                    el.building !== num ? `hoverBox disable` : `hoverBox`
                  }
                >
                  <h4>{el.studyName}</h4>
                  <p>
                    {`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}
                  </p>
                </div>
                <img
                  onMouseEnter={() => setNum(el.building)}
                  onMouseLeave={() => setNum(0)}
                  src={`/images/b-${el.building}.svg`}
                  key={el.building}
                  alt={`building${el.building}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="study-my">
        <div className="title">
          <h4>나의 스터디</h4>
          <div className="flexBox">
            <p className="totalCnt">총 {userInfo?.joinedStudy?.length}개</p>
            <p>| 현재 참여중인 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
        <div className="flexBox-start cardBox">
          {userInfo?.joinedStudy?.map((el, idx) => {
            return <MyStudy key={idx} joinedStudy={el} />;
          })}
        </div>
      </div>
      <div className="study-like">
        <div className="title">
          <h4>관심 스터디</h4>
          <div className="flexBox">
            <p className="totalCnt">총 {userInfo?.likedStudy?.length}개</p>
            <p>| 관심있는 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
        <div className="flexBox-start cardBox">
          {likeStudy?.map((el, idx) => {
            return <ReadyStudy key={idx} item={el} />;
          })}
        </div>
      </div>
    </div>
  );
}
