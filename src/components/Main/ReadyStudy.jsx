import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/study.scss';
export default function ReadyStudy({ item }) {
  const date = new Date(item.createDate);

  const handleLike = (e) => {
    e.preventDefault();
    console.log('click');
  };
  return (
    <Link
      to={`/study/detail/${item._id}`}
      className="likeStudyBox studyContainer"
    >
      <p className="date">
        {`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`} |{' '}
        {item.field}
      </p>
      <h3>{item.studyName}</h3>
      <div className="flexBox-alignCenter">
        <ul className="flexBox skills">
          {item?.skills?.map((el) => {
            return (
              <p key={el}>
                <img src={`/images/skill_icon/${el}.svg`} alt="" />
              </p>
            );
          })}
        </ul>
        <span className="ellipsis">{item?.skills.length >= 4 && '...'}</span>
      </div>
      <p className="memberCount">
        <span>{`${item.memberNum.maxNum}`}</span>명 중{' '}
        <span> {`${item.memberNum.currentNum}`}</span>명 모집됨
      </p>
      <div className="clickHeart" onClick={(e) => handleLike(e)}>
        <img src="/images/icon_heartOn.svg" alt="heart" />
      </div>
    </Link>
  );
}
