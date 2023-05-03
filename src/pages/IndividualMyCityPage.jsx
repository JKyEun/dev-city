import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import IndividualProfile from '../components/IndividualMyCity/IndividualProfile';
import IndividualTab from '../components/IndividualMyCity/IndividualTab';

export default function IndividualMyCityPage() {
  const { id } = useParams();
  const [individualInfo, setIndividualInfo] = useState(null);
  const navigate = useNavigate();

  const getIndividualInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);

      setIndividualInfo(() => res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('JWT') === null) {
      navigate('/signin');
    }
  });

  useEffect(() => {
    getIndividualInfo();
  }, []);

  return (
    <div className="minMax">
      {individualInfo && (
        <div className="flexBox-between-start">
          <IndividualProfile individualInfo={individualInfo} />
          <IndividualTab individualInfo={individualInfo} />
        </div>
      )}
    </div>
  );
}
