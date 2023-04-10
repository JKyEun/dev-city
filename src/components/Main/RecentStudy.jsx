import React, { useEffect, useState } from 'react';
import '../../style/RecentStudy.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RecentStudy(props) {
  const [interestList, setInterestList] = useState({});
  const [studyList, setStudyList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/')
      .then((response) => {
        setStudyList(response.data);
        const interests = Array(response.data.length).fill(false);
        setInterestList(interests);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInterestClick = (index) => {
    // interestList의 index 위치의 값을 반대로 변경
    const interests = [...interestList];
    interests[index] = !interests[index];
    setInterestList(interests);
  };
  return (
    <>
      {studyList.map((study, index) => (
        <div key={study._id} className="studyBoard">
          <div className="createDate">
            {new Date(study.createDate).toLocaleString()}
          </div>
          <div className="studyName">{study.studyName}</div>
          <div className="field">{study.field}</div>
          <div className="skills">
            {study.skills.map((skill) => (
              <img
                key={skill}
                src={`/images/skill_icon/${skill}.svg`}
                alt={`${skill}이미지`}
              />
            ))}
          </div>
          <div className="info">
            <div className="member">
              {study.memberNum.currentNum}/{study.memberNum.maxNum}
            </div>
            <ul>
              <div className="flexBox">
                <li className="participate">
                  <Link to={`/study/detail/${study._id}`}>참가하기</Link>
                </li>
                <li className="interst">
                  <span onClick={() => handleInterestClick(index)}>
                    {interestList[index] ? (
                      <img src="./images/icon_heartOff.svg" />
                    ) : (
                      <img src="./images/icon_heartoOn.svg" />
                    )}
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}
