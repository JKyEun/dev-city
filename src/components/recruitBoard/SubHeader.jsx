import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../../store/modules/study';
import '../../style/recruitBoard/SubHeader.scss';

export default function SubHeader() {
  const category = useSelector((state) => state.study.category);
  const dispatch = useDispatch();
  const handleSkillClick = (skillName) => {
    if (category.includes(skillName)) {
    }
    const action = changeCategory(skillName);
    dispatch(action);
  };
  return (
    <div className="skills">
      <span className="skill" onClick={() => handleSkillClick('전체')} href="/">
        전체
      </span>
      <span
        className="skill"
        onClick={() => handleSkillClick('Javascript')}
        href="/"
      >
        JavaScript
      </span>
      <span
        className="skill"
        onClick={() => handleSkillClick('Nodejs')}
        href="/"
      >
        Nodejs
      </span>
      <span
        className="skill"
        onClick={() => handleSkillClick('Spring')}
        href="/"
      >
        Spring
      </span>
      <span
        className="skill"
        onClick={() => handleSkillClick('React')}
        href="/"
      >
        React
      </span>
      <span className="skill" onClick={() => handleSkillClick('Vue')} href="/">
        Vue
      </span>
      <span
        className="skill"
        onClick={() => handleSkillClick('TypeScript')}
        href="/"
      >
        TypeScript
      </span>
      <span
        className="skill"
        onClick={() => handleSkillClick('Figma')}
        href="/"
      >
        Figma
      </span>
      <span className="skill" onClick={() => handleSkillClick('Go')} href="/">
        Go
      </span>
      <span
        className="skill"
        onClick={() => handleSkillClick('Nestjs')}
        href="/"
      >
        Nestjs
      </span>
    </div>
  );
}
