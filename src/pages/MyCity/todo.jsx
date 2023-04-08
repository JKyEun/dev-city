import React from "react";
import Profile from "../../components/MyCity/Profile";
import Tab from "../../components/MyCity/Tab";
import "../../style/tab.scss";
export default function todo() {
  return (
    <div className="minMax">
      <div className="flexBox-between">
        <Profile />
        <Tab />
      </div>
    </div>
  );
}
