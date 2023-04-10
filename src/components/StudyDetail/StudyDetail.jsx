import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudyDetail({ match }) {
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/study/detail/${match.params.id}`,
        );
        setStudy(response.data); // study 속성을 가져옴
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudy();
  }, [match.params.id]);

  return (
    <div>
      {!loading && (
        <>
          <h1>상세페이지</h1>
          <h1>{study.field}</h1>
          <p>{study.studyName}</p>
          <p>{study.studyIntro}</p>
        </>
      )}
    </div>
  );
}
