import React from 'react';
import '../../style/MyStudy.scss';

export default function MyStudy({ studyList }) {
  const date = new Date(studyList.date);
  return (
    <div className="myStudyBoard">
      <div>
        <img src={`/images/b-${studyList.building}.svg`} alt="building" />
      </div>
      <p className="date">{`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}</p>
      <h3>{studyList.studyName}</h3>
      <ul className="flexBox skills">
        {studyList?.skills?.map((el) => {
          return (
            <li key={el}>
              <img src={`/images/skill_icon/${el}.svg`} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
