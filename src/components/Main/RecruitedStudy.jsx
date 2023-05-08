import React, { useEffect } from 'react';
import ReadyStudy from '../../components/Main/ReadyStudy';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { init } from '../../store/modules/study';
import { useNavigate } from 'react-router-dom';
import '../../style/main.scss';
import { getStudy } from '../../apis/study';

export default function RecruitedStudy() {
  const studies = useSelector((el) => el.study.studies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // study 데이터 가져와서 state에 적용시키기
  const getStudyInfo = async () => {
    const res = await getStudy();
    const latestStudies = res.slice().reverse().slice(0, 4);
    dispatch(init(latestStudies));
  };

  useEffect(() => {
    getStudyInfo();
    if (!localStorage.getItem('userId')) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <div className="part1">
        <div className="minMax">
          <div className="text">
            <div className="mainText">모집 중인 스터디</div>
            <div className="subText">
              현재 진행중인 스터디를 확인하고 참여해보세요
            </div>
          </div>
          <div className="showStudy flexBox">
            {studies?.map((item) => {
              return (
                <ReadyStudy
                  className="studyBoard"
                  key={item._id}
                  item={item}
                  isMain={true}
                />
              );
            })}
            <div className="plusStudy">
              <Link to={'/study'}>
                <img src="/images/icon_plus.svg" alt="스터디 더보기"></img>
                <div>더보기</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
