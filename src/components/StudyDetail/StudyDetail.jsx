import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../style/detail.scss';
import { fetchStudy, setStudy } from '../../store/modules/studyDetail';

export default function StudyDetail({ match }) {
  const study = useSelector((state) => state.studyDetail.study);
  const loading = useSelector((state) => state.studyDetail.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        dispatch(fetchStudy(match.params.id));
        // match.params.id로 스터디 상세 정보를 가져옴
        // match.params.id에 해당하는 스터디 정보는 response에
        const response = await axios.get(
          `http://localhost:4000/study/detail/${match.params.id}`,
        );

        const study = response.data;

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

        dispatch(
          setStudy({
            ...study,
            canJoin: canJoin,
            isLeader: isLeader,
          }),
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudyData();
  }, [dispatch, match.params.id]);

  return (
    <div>
      {!loading && study && (
        <>
          <div className="minMax detailDiv">
            <div className="studyTop">
              <div>
                <h1>{study.studyName}</h1>
                <p>
                  닉네임 |{' '}
                  {study.createDate
                    ? new Date(study.createDate).toLocaleString()
                    : '날짜 정보 없음'}
                </p>
              </div>

              {/* 해당 스터디 가입 유무 */}
              <div>
                {study.isLeader && !study.canJoin ? (
                  <button>수정하기</button>
                ) : (
                  <button>참여하기</button>
                )}
              </div>
            </div>

            <div className="studyContent">
              <h2>스터디 소개</h2>
              <br />
              <p>{study.studyIntro}</p>
            </div>
            <div className="skillsImg">
              {study.skills.map((skill) => (
                <img
                  key={skill}
                  src={`/images/skill_icon/${skill}.svg`}
                  alt={`${skill}이미지`}
                />
              ))}
            </div>
            <div className="studyMemberDiv">
              <h2>스터디 멤버</h2>
              <div className="studyMember">
                <div>멤버 1</div>
                <div>멤버 2</div>
                <div>멤버 3</div>
                <div>멤버 4</div>
                <div>멤버 5</div>
              </div>
            </div>
            <div className="commonGoal">
              <h2>공동목표</h2>
              <div>공동목표</div>
            </div>
            <div className="detailStudyBoard">
              <h2>스터디 게시판</h2>
              <div>스터디</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
