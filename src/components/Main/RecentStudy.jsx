import React, { useEffect, useState } from 'react';
import '../../style/RecentStudy.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RecentStudy(props) {
  const [interestList, setInterestList] = useState({});
  const [studyList, setStudyList] = useState([]);

  const getReadyStudy = async () => {
    try {
      const res = await axios.get('http://localhost:4000/study');
      const study = res.data.sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate),
      );
      const latestStudies = study.slice(0, 4);
      setStudyList(latestStudies);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReadyStudy();
  }, []);
  console.log(studyList);
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
            {new Date(study.createDate).toLocaleString()}|{study.field}
          </div>

          <div className="studyName">{study.studyName}</div>

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
