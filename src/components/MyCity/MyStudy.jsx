import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/MyStudy.scss';

export default function MyStudy({ studyList }) {
  const date = new Date(studyList.date);

  return (
    <Link to={`/study/detail/${studyList._id}`} className="myStudyBoard">
      {studyList.isLeader && <span className="leaderTag">Leader</span>}
      <img src={`/images/inside-b-${studyList.building}.svg`} alt="building" />

      <p className="date">
        {`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}
        <span>| {studyList.field}</span>
      </p>
      <h3>{studyList.studyName}</h3>
      <ul className="flexBox skills">
        {studyList?.skills?.map((el) => {
          return (
            <p>
              <img src={`/images/skill_icon/${el}.svg`} alt="" />
            </p>
          );
        })}
      </ul>
      <span className="ellipsis">{studyList?.skills.length >= 4 && '...'}</span>
    </Link>
  );
}
