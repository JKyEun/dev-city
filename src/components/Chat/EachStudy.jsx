import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function EachStudy({ study, setRoomId }) {
  const userInfo = useSelector((state) => state.user);
  const [studyDetail, setStudyDetail] = useState(null);
  const [memberList, setMemeberList] = useState(null);
  const getStudyDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/study/detail/${study.objectId}`,
      );

      setStudyDetail(() => res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStudyDetail();
  }, []);

  useEffect(() => {
    if (studyDetail) {
      const exceptMe = studyDetail.member.filter(
        (el) => el.memberId !== userInfo.userId,
      );
      setMemeberList(exceptMe);
    }
  }, [studyDetail]);

  return (
    <li className="studyLi" key={study.objectId}>
      {memberList && (
        <>
          <div className="study">{study.studyName}</div>
          {memberList.map((el) => {
            const arr = [userInfo.userId, el.memberId];
            const newRoomId = arr.sort();
            return (
              <div onClick={() => setRoomId(newRoomId)} className="member">
                {el.memberId}
              </div>
            );
          })}
        </>
      )}
      <br />
    </li>
  );
}
