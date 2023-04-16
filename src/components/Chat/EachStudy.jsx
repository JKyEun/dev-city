import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function EachStudy({ study }) {
  const [studyDetail, setStudyDetail] = useState(null);
  const getStudyDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/study/detail/${study.objectId}`,
      );

      setStudyDetail(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStudyDetail();
  }, []);

  return (
    <li className="studyLi" key={study.objectId}>
      {studyDetail && (
        <>
          <div className="study">{study.studyName}</div>
          {studyDetail.member.map((el) => (
            <div className="member">{el.memberId}</div>
          ))}
        </>
      )}
      <br />
    </li>
  );
}
