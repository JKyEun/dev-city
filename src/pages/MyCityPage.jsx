import React from 'react';
import Profile from '../components/MyCity/Profile';
import Tab from '../components/MyCity/Tab';

export default function MyCityPage() {
  return (
    <div className="minMax">
      <div className="flexBox-between">
        <Profile />
        <Tab />
      </div>
    </div>
  );
}
