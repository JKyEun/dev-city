import React, { useState, useEffect } from 'react';
import MyStudy from '../MyCity/MyStudy';
import LikeStudy from './LikeStudy';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { init } from '../../store/modules/study';
import '../../style/study.scss';
import { getUser } from '../../apis/user';
import { getStudy } from '../../apis/study';

export default function Study() {
  const [render, setRender] = useState('');

  const [num, setNum] = useState(0);
  const [likeStudy, setLikeStudy] = useState([]);
  const [joinedStudy, setJoinedStudy] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  const handleRender = (params) => {
    setRender((cur) => cur + params);
  };
  const getStudyInfo = async () => {
    try {
      const resStudy = await getStudy();
      dispatch(init(resStudy));
      const id = localStorage.getItem('userId');
      const resUser = await getUser(id);
      const result = resStudy?.filter((study) => {
        return resUser?.likedStudy?.includes(study._id);
      });
      setJoinedStudy(resUser.joinedStudy);
      setLikeStudy(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStudyInfo();
    if (!localStorage.getItem('userId')) {
      navigate('/signin');
    }
  }, [render]);

  return (
    <div className="studyTab">
      <div className="buildingBox">
        <img className="bg" src="/images/building-bg.svg" alt="bg" />
        {joinedStudy?.map((el, idx) => {
          const date = new Date(el.createDate);
          return (
            <div
              key={idx}
              className={`building building${el.buildingLocation}`}
            >
              <div className="contentBox">
                <div
                  className={
                    el.building !== num ? `hoverBox disable` : `hoverBox`
                  }
                >
                  <h4>{el.studyName}</h4>
                  <p>
                    {`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}
                  </p>
                </div>
                <img
                  onMouseEnter={() => setNum(el.building)}
                  onMouseLeave={() => setNum(0)}
                  src={`/images/b-${el.building}.svg`}
                  key={el.building}
                  alt={`building${el.building}`}
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
            <p className="totalCnt">총 {joinedStudy?.length}개</p>
            <p>| 현재 참여중인 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
        <div className="flexBox-start cardBox">
          {joinedStudy.length > 0 ? (
            joinedStudy?.map((el, idx) => {
              return <MyStudy key={idx} joinedStudy={el} />;
            })
          ) : (
            <div className="emptyBox">
              <p>나의 스터디가 없습니다.</p>
              <Link className="btn-basic" to="/study/create">
                스터디 생성하기
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="study-like">
        <div className="title">
          <h4>관심 스터디</h4>
          <div className="flexBox">
            <p className="totalCnt">총 {likeStudy?.length}개</p>
            <p>| 관심있는 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
        <div className="flexBox-start cardBox">
          {likeStudy.length > 0 ? (
            likeStudy?.map((el, idx) => {
              return (
                <LikeStudy
                  key={idx}
                  idx={idx}
                  item={el}
                  userId={userId}
                  handleRender={handleRender}
                />
              );
            })
          ) : (
            <div className="emptyBox">
              <p>관심 스터디가 없습니다.</p>
              <Link className="btn-basic" to="/study">
                관심 스터디 추가하기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
