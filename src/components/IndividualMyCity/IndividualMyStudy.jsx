import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/MyStudy.scss';

export default function IndividualMyStudy({ joinedStudy, individualInfo }) {
  const userId = individualInfo.userId;
  const date = new Date(joinedStudy?.createDate);

  return (
    <Link
      to={`/study/detail/${joinedStudy?.objectId}`}
      className="studyContainer myStudyContainer"
    >
      {joinedStudy?.leaderId === userId && (
        <span className="leaderTag">Leader</span>
      )}
      <img
        src={`/images/inside-b-${joinedStudy?.building}.svg`}
        alt="building"
      />

      <p className="date">
        {`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}
        <span>| {joinedStudy?.field}</span>
      </p>
      <h3>{joinedStudy?.studyName}</h3>
      <div className="flexBox-alignCenter">
        <ul className="flexBox skills">
          {joinedStudy?.skills?.map((el) => {
            if (el === 'C#') {
              el = 'cSharp';
            } else {
              el = el.toLowerCase();
            }
            return (
              <p key={el}>
                <img src={`/images/skill_icon/${el}.svg`} alt="" />
              </p>
            );
          })}
        </ul>
        <span className="ellipsis">
          {joinedStudy?.skills?.length > 4 && '...'}
        </span>
      </div>
    </Link>
  );
}
