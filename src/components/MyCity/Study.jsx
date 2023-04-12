import React, { useEffect, useState } from 'react';
import MyStudy from '../MyCity/MyStudy';
import axios from 'axios';
import '../../style/study.scss';
import RecentStudy from '../Main/RecentStudy';

export default function Study() {
  const [randomNum, setRandomNum] = useState();
  const [studyList, setStudyList] = useState([]);
  const [building, setBuilding] = useState([]);

  const getLikeStudy = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      const studyBuilding = res.data.studyList.map((el) => {
        return el.building;
      });
      const buildingLocation = res.data.studyList.map((el) => {
        return el.buildingLocation;
      });
      setStudyList(res.data.studyList);
      setBuilding(studyBuilding);
      setRandomNum(buildingLocation);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLikeStudy('kkk');
  }, []);

  return (
    <div className="studyTab">
      <div className="buildingBox">
        <img className="bg" src="/images/building-bg.svg" />
        {building?.map((el, idx) => {
          return (
            <img
              className={`building building${randomNum[idx]}`}
              src={`/images/b-${el}.svg`}
              key={el}
              alt={`building${el}`}
            />
          );
        })}
      </div>
      <div className="study-my">
        <div className="title">
          <h4>나의 스터디</h4>
          <div className="flexBox">
            <p className="totalCnt">총 {building.length}개</p>
            <p>| 현재 참여중인 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
        <div className="flexBox-start cardBox">
          {studyList.map((el, idx) => {
            return <MyStudy key={idx} studyList={el} />;
          })}
        </div>
      </div>
      <div className="study-like">
        <div className="title">
          <h4>관심 스터디</h4>
          <div className="flexBox">
            <p className="totalCnt">총 {}개</p>
            <p>| 관심있는 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
        <div className="flexBox-start cardBox">
          <RecentStudy />
        </div>
      </div>
    </div>
  );
}
