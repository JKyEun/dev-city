import React, { useEffect } from 'react';
import Profile from '../components/MyCity/Profile';
import Tab from '../components/MyCity/Tab';
import { useNavigate } from 'react-router-dom';

export default function MyCityPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('JWT') === null) {
      navigate('/signin');
    }
  });

  return (
    <div className="minMax">
      <div className="flexBox-between">
        <Profile />
        <Tab />
      </div>
    </div>
  );
}
