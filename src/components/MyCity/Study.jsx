import React, { useEffect, useState } from 'react';
import MainStudyView from '../MainViewStudy/MainStudyView';
import MyStudy from '../MyCity/MyStudy';
import axios from 'axios';
import '../../style/study.scss';

export default function Study() {
  const [studyList, setStudyList] = useState([]);
  const [building, setBuilding] = useState([]);

  const [randomNum, setRandomNum] = useState([0]);

  const getLikeStudy = async (id) => {
    axios
      .get(`http://localhost:4000/user/${id}`)
      .then((response) => {
        setStudyList(response.data.studyList);
        setBuilding(
          response.data.studyList.map((el) => {
            return el.building;
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRandom = async () => {
    let randomIndexArray = [];
    for (let i = 0; i < building.length; i++) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i--;
      }
    }
    return await setRandomNum((cur) => randomIndexArray);
  };
  useEffect(() => {
    handleRandom();
    getLikeStudy('kkk');
  }, []);

  return (
    <div className="studyTab">
      <div className="buildingBox">
        <img className="bg" src="/images/building-bg.svg" />
        {building?.map((el, idx) => {
          return (
            <img
              className={
                randomNum.length !== 0
                  ? `building building${randomNum[idx]}`
                  : `building building${el}`
              }
              key={el}
              src={`/images/b-${el}.svg`}
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
          <div className="flexBox-start cardBox"></div>
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
          <MainStudyView />
        </div>
      </div>
    </div>
  );
}
