import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function StudyParticipants({ member }) {
  //   const studyDetail = useSelector((state) => state.studyDetail.study);
  //   const [userDetail, setUserDetail] = useState([]);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       const response = await axios.get('http://localhost:4000/allUser');
  //       setUserDetail(response.data);
  //     };
  //     fetchUserData();
  //   }, []);

  //   console.log(studyDetail);
  //   console.log(userDetail);
  return (
    <div>
      <div className="flexBox">
        <div>
          <div>{member.memberId}</div>
        </div>
      </div>
    </div>
  );
}
