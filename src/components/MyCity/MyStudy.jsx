import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../style/MyStudy.scss';

export default function MyStudy({ joinedStudy }) {
  const userId = useSelector((state) => state.user.userId);
  const study = useSelector((state) => state.study.studies);
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
        {`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}
        <span>| {joinedStudy?.field}</span>
      </p>
      <h3>{joinedStudy?.studyName}</h3>
      <div className="flexBox-alignCenter">
        <ul className="flexBox skills">
          {joinedStudy?.skills?.map((el) => {
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
