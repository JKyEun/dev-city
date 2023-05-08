import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLike } from '../../store/modules/user';
import axios from 'axios';
import { getUser } from '../../apis/user';
import { pushLikeList } from '../../apis/study';

export default function LikeStudy({ e, item, idx, userId, handleRender }) {
  const date = new Date(item.createDate);
  const dispatch = useDispatch();

  const updateLikeList = async (e) => {
    const userId = localStorage.getItem('userId');
    const res = await getUser(userId);
    dispatch(updateLike(res.likedStudy));
  };

  const handleLike = async (e) => {
    handleRender('hi');
    e.preventDefault();

    await pushLikeList({
      userId: userId,
      studyId: item._id,
      isDelete: true,
    });
    updateLikeList();
  };

  return (
    <Link
      key={idx}
      to={`/study/detail/${item._id}`}
      className="likeStudyBox studyContainer"
    >
      <p className="date">
        {`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`} |{' '}
        {item.field}
      </p>
      <h3>{item.studyName}</h3>
      <div className="flexBox-alignCenter">
        <ul className="flexBox skills">
          {item?.skills?.map((el) => {
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
        <span className="ellipsis">{item?.skills.length > 4 && '...'}</span>
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
