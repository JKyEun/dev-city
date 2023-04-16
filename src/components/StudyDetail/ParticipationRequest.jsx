import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudy } from '../../store/modules/studyDetail';
import { useParams } from 'react-router-dom';

export default function ParticipationRequest({ userId }) {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const study = useSelector((state) => state.studyDetail.study);
  const dispatch = useDispatch();

  const getMemberInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      setMember(() => res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptRequest = async () => {
    try {
      const currentUserId = member.userId;

      const isLeader = study.member.some(
        (member) => member.isLeader && member.memberId === currentUserId,
      );
      const updatedMember = {
        memberId: currentUserId,
        isLeader: false,
      };
      if (isLeader) {
        updatedMember.isLeader = true;
      }

      const responseStudy = await axios.put(
        `http://localhost:4000/study/update/${id}`,
        { updatedMember },
      );

      console.log(responseStudy);

      const responseUser = await axios.post(
        `http://localhost:4000/user/joinstudy/`,
        { userId: currentUserId, studyId: id },
      );

      console.log(responseUser);

      // request에서 제거해주기
      acceptRemoveRequest();
    } catch (err) {
      console.error(err);
    }
  };

  const acceptRemoveRequest = async () => {
    try {
      const currentUserId = member.userId;
      const removedRequest = study.request.filter((el) => el !== currentUserId);
      const currentNum = study.memberNum.currentNum;
      const updatedMember = {
        memberId: currentUserId,
        isLeader: false,
      };

      const newStudy = {
        ...study,
        request: removedRequest,
        member: [...study.member, updatedMember],
        memberNum: {
          ...study.memberNum,
          currentNum: currentNum + 1, // 현재 참여 인원수 +1
        },
      };

      dispatch(setStudy(newStudy));

      const toRemoveId = {
        userId: currentUserId,
      };

      const requestRes = await axios.post(
        `http://localhost:4000/invite/remove/${id}`,
        toRemoveId,
      );

      console.log(requestRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMemberInfo(userId);
  }, []);

  const refuseRemoveRequest = async () => {
    try {
      const currentUserId = member.userId;
      const removedRequest = study.request.filter((el) => el !== currentUserId);

      const newStudy = {
        ...study,
        request: removedRequest,
      };

      dispatch(setStudy(newStudy));

      const toRemoveId = {
        userId: currentUserId,
      };

      const requestRes = await axios.post(
        `http://localhost:4000/invite/remove/${id}`,
        toRemoveId,
      );

      console.log(requestRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMemberInfo(userId);
  }, []);

  return (
    <div className="profile">
      {member && (
        <>
          <div className="profileBox">
            <img
              className="profilePhoto"
              src={
                member.profileImg
                  ? member.profileImg
                  : '/images/default-profile.png'
              }
              alt="프로필 사진"
            />
            <img src="/images/editIcon.svg" alt="" />
          </div>
          <div className="nickName">{member.nickName}</div>
          <div className="userName">{member.userName}</div>
          <div>
            <span className="field">{member.field}</span>
            <span className="level">Lv.{member.level}</span>
          </div>
        </>
      )}
      <div>
        <button onClick={acceptRequest}>수락</button>
        <button onClick={refuseRemoveRequest}>거절</button>
      </div>
    </div>
  );
}
