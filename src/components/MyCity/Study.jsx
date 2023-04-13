import React, { useEffect, useState } from 'react';
import MyStudy from '../MyCity/MyStudy';
import axios from 'axios';
import '../../style/study.scss';
import ReadyStudy from '../Main/ReadyStudy';

export default function Study() {
  const [randomNum, setRandomNum] = useState();
  const [studyList, setStudyList] = useState([]);
  const [likeStudyList, setLikeStudyList] = useState([]);
  const [building, setBuilding] = useState([]);
  const [info, setInfo] = useState({ studyName: 'null', date: 'null' });
  const [num, setNum] = useState(0);

  const getStudy = async (id) => {
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
      setLikeStudyList(res.data.likeStudyList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStudy('kkk');
  }, []);

  const handleOver = async (number) => {
    setNum(number);
    await studyList
      ?.filter((item, idx) => {
        return number === item.building;
      })
      .map((el) => {
        setInfo(el);
      });
  };
  console.log(info);
  return (
    <div className="studyTab">
      <div className="buildingBox">
        <img className="bg" src="/images/building-bg.svg" />

        {building?.map((el, idx) => {
          const date = new Date(info.date);
          return (
            <div className={`building building${randomNum[idx]}`}>
              <div className="contentBox">
                <div className={el !== num ? `hoverBox disable` : `hoverBox`}>
                  <h4>{info.studyName}</h4>
                  <p>
                    {`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}
                  </p>
                </div>
                <img
                  onMouseEnter={() => handleOver(el)}
                  onMouseLeave={() => setNum(0)}
                  src={`/images/b-${el}.svg`}
                  key={el}
                  alt={`building${el}`}
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
          <ReadyStudy studyList={likeStudyList} />
        </div>
      </div>
    </div>
  );
}
