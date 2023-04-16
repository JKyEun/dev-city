import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../style/studyDetail.scss';
import {
  fetchStudy,
  setStudy,
  closeAndOpenStudy,
} from '../../store/modules/studyDetail';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import ParticipationRequest from './ParticipationRequest';
import { Link, useNavigate } from 'react-router-dom';
import StudyParticipants from './StudyParticipants';

export default function StudyDetail({ match, studyDetail }) {
  const study = useSelector((state) => state.studyDetail.study);
  const loading = useSelector((state) => state.studyDetail.loading);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myMemberEl =
    study &&
    study.member.filter((el) => el.memberId === localStorage.getItem('userId'));
  const isLeader =
    myMemberEl && myMemberEl.length > 0 ? myMemberEl[0].isLeader : false;
  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        dispatch(fetchStudy(match.params.id));
        // match.params.id로 스터디 상세 정보를 가져옴
        // match.params.id에 해당하는 스터디 정보는 response에
        const resFetch = await axios.get(
          `http://localhost:4000/study/detail/${match.params.id}`,
        );

        const study = resFetch.data;

        // 현재 사용자의 ID는 로컬스토리지에서 가져옴
        const currentUserId = localStorage.getItem('userId');
        // 현재 로그인한 ID와 (해당 스터디 멤버에 들어있는 memberId가 같거나, isLeader가 true면) isLeader는 true
        const isLeader = study.member?.find(
          (member) => member.memberId === currentUserId && member.isLeader,
        );

        // isLeader가 false면 리더가 아니고 study 컬렉션에 멤버 배열에서 memberId가 현재 로그인한 ID랑 다르면 멤버가 아니란 소리
        const canJoin =
          !isLeader &&
          !study.member?.some((member) => member.memberId === currentUserId);

        // study 멤버가 꽉 차거나 이미 isClosed가 true 라면 isClosed를 true 로 바꾸기 (리덕스)
        const isClosed =
          study.memberNum.currentNum === study.memberNum.maxNum ||
          study.isClosed
            ? true
            : false;
        // 사람 꽉차면 백엔드 isClosed를 true로 바꾸기
        if (study.memberNum.currentNum === study.memberNum.maxNum) {
          await axios.post(
            `http://localhost:4000/study/detail/${match.params.id}/close`,
          );
        }
        dispatch(
          setStudy({
            ...study,
            canJoin: canJoin,
            isLeader: isLeader,
            isClosed: isClosed,
          }),
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudyData();
  }, [dispatch, match.params.id]);

  // 참여하기
  const joinStudy = async () => {
    const joinedStudy = user.joinedStudy || [];
    if (joinedStudy.length === 9) {
      alert('이미 최대 개수의 스터디에 참여하였습니다.');
      return;
    }
    try {
      const currentUserId = localStorage.getItem('userId');
      const memberExists = study.member.some(
        (member) => member.memberId === currentUserId,
      );
      if (memberExists) {
        alert('이미 스터디에 참여한 멤버입니다.');
        return;
      }
      const maxNum = study.memberNum.maxNum;
      const currentNum = study.memberNum.currentNum;

      if (currentNum >= maxNum) {
        alert('스터디 최대 참여 인원을 초과하였습니다.');
        return;
      }

      const getRes = await axios.get(
        `http://localhost:4000/invite/get/${match.params.id}`,
      );

      const requestList = getRes.data.request;
      if (requestList.includes(currentUserId)) {
        alert('이미 참가신청이 완료되었습니다.');
        return;
      }

      const requestUser = {
        userId: currentUserId,
      };

      const addRes = await axios.post(
        `http://localhost:4000/invite/add/${match.params.id}`,
        requestUser,
      );

      console.log(addRes.data);

      const newStudy = {
        ...study,
        request: [...study.request, currentUserId],
      };

      dispatch(setStudy(newStudy));

      alert('스터디 참가 신청이 완료되었습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  // 삭제하기
  const deleteStudy = async () => {
    if (window.confirm('스터디를 삭제하시겠습니까?')) {
      try {
        const resDelete = await axios.delete(
          `http://localhost:4000/study/delete/${match.params.id}`,
        );
        alert(resDelete.data);
        // 스터디 삭제 후 스터디 리스트 페이지로 이동
        navigate('/study');
        dispatch(setStudy(null));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 탈퇴하기
  const leaveStudy = async () => {
    if (window.confirm('스터디에서 탈퇴하시겠습니까?')) {
      try {
        const resLeave = await axios.delete(
          `http://localhost:4000/study/leave/${match.params.id}`,
          { data: { userId: localStorage.getItem('userId') } },
        );

        const currentNum = study.memberNum.currentNum;

        console.log('1:', resLeave.data.updatedMembers);
        dispatch(
          setStudy({
            ...study,
            member: resLeave.data.updatedMembers,
            memberNum: {
              ...study.memberNum,
              currentNum: currentNum - 1, // 현재 참여 인원수 -1
            },
          }),
        );
        console.log('2:', resLeave.data.updatedMembers);
        alert(resLeave.data.message);
      } catch (err) {
        console.error(err);
      }
    }
  };
  // 모집 마감, 모집 재시작하기

  const CloseAndOpenEvent = async () => {
    if (!study.isClosed) {
      await axios.post(
        `http://localhost:4000/study/detail/${match.params.id}/close`,
      );
      dispatch(closeAndOpenStudy(true));
    } else {
      await axios.post(
        `http://localhost:4000/study/detail/${match.params.id}/open`,
      );
      dispatch(closeAndOpenStudy(false));
    }
  };

  return (
    <div>
      {!loading && study && (
        <>
          <div className="minMax flexBox-between studyDetailContainer">
            <div className="box-studyInfo">
              <Link to={'/study'}>
                <img
                  className="left-arrow"
                  src="/images/left-arrow.svg"
                  alt="left-arrow"
                />
                스터디홈으로 돌아가기
              </Link>
              <h1>{study.studyName}</h1>
              <Fragment>
                <h5>
                  {study.nickName} | {study.field} |{' '}
                  {new Date(study.createDate).toLocaleDateString('ko-KR')}
                </h5>
                <div className="studyInfoBox">
                  <div className="flexBox">
                    <p className="subTitle">스터디 소개</p>
                    <p className="studyInfoContent"> {study.studyIntro}</p>
                  </div>
                  <br />
                  <br />
                  <div className="flexBox">
                    <p className="subTitle">진행 방식</p>
                    <p className="studyInfoContent">
                      {study.studySystem
                        ? study.studySystem
                        : '진행 방식 정보 없음'}
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="flexBox">
                    <p className="subTitle">사용 언어</p>
                    <p className="studyInfoImg">
                      {study.skills.map((skill) => (
                        <img
                          key={skill}
                          src={`/images/skill_icon/${skill}.svg`}
                          alt={`${skill}이미지`}
                        />
                      ))}
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="flexBox">
                    <p className="subTitle">스터디원</p>
                    {study.member.map((e) => (
                      <StudyParticipants key={e} member={e} />
                    ))}
                    {isLeader &&
                      study.request.map((el) => (
                        <ParticipationRequest key={el} userId={el} />
                      ))}
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="box-studyDetail">
              <div className="percent">
                <CircularProgressbarWithChildren
                  value={
                    (`${study.memberNum.currentNum}` /
                      `${study.memberNum.maxNum}`) *
                    100
                  }
                  styles={
                    (buildStyles({
                      textSize: '16px',
                      textColor: '#605CFF',
                    }),
                    {
                      path: {
                        stroke: `#605CFF`,
                      },
                      text: {
                        // Text color
                        fill: '#605CFF',
                        // Text size
                        fontSize: '16px',
                        fontWeight: 700,
                      },
                    })
                  }
                >
                  {study.isClosed ? (
                    <p className="closeText">모집 마감</p>
                  ) : (
                    <div className="memberCountText">
                      <p className="currentNumText">
                        {study.memberNum.currentNum}
                      </p>
                      <span>/</span>
                      <p className="maxNumText">{study.memberNum.maxNum}</p>
                    </div>
                  )}
                </CircularProgressbarWithChildren>
                <p className="openCloseText">
                  <span>
                    <span className="maxNum">{study.memberNum.maxNum}</span>명
                    중{' '}
                    <span className="currentNum">
                      {study.memberNum.currentNum}
                    </span>
                    명 모집됨
                  </span>
                </p>
              </div>
              <div>
                {study.isLeader ? (
                  <div>
                    <a className="btn btn--share">공유하기</a>
                    <a className="btn btn--modify" onClick={deleteStudy}>
                      수정하기
                    </a>
                    {study.memberNum.currentNum ===
                    study.memberNum.maxNum ? null : study.isClosed ? (
                      <div className="leaderBtnDiv">
                        <p className="openBtn" onClick={CloseAndOpenEvent}>
                          모집시작
                        </p>
                        <p className="deleteBtn" onClick={CloseAndOpenEvent}>
                          스터디삭제
                        </p>
                      </div>
                    ) : (
                      <div className="leaderBtnDiv">
                        <p className="closeBtn" onClick={CloseAndOpenEvent}>
                          모집마감
                        </p>
                        <p className="deleteBtn" onClick={CloseAndOpenEvent}>
                          스터디삭제
                        </p>
                      </div>
                    )}
                  </div>
                ) : study.member.some(
                    (member) =>
                      member.memberId === localStorage.getItem('userId'),
                  ) ? (
                  <div className="">
                    <a className="btn btn--share">공유하기</a>
                    <a className="btn btn--leave" onClick={leaveStudy}>
                      탈퇴하기
                    </a>
                  </div>
                ) : (
                  <div>
                    <a className="btn btn--share">공유하기</a>
                    {study.isClosed ? (
                      <a className="btn btn--close" onClick={leaveStudy}>
                        모집마감
                      </a>
                    ) : (
                      <a
                        className="btn btn--join"
                        onClick={joinStudy}
                        disabled={!study.canJoin}
                      >
                        참여하기
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
