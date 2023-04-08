import React from "react";
import "../../style/recruitBoard/SubHeader.scss";

export default function SubHeader() {
  return (
    <div className="skills">
      <a className="skill" href="/">
        전체
      </a>
      <a className="skill" href="/">
        JavaScript
      </a>
      <a className="skill" href="/">
        React
      </a>
      <a className="skill" href="/">
        TypeScript
      </a>
    </div>
  );
}
