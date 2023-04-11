import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../../store/modules/study';
import '../../style/recruitBoard/SubHeader.scss';

export default function SubHeader() {
  const dispatch = useDispatch();
  const handleSkillClick = (skillName) => {
    const action = changeCategory(skillName);
    dispatch(action);
  };
  return (
    <div className="skills">
      <span className="skill" onClick={() => handleSkillClick('전체')}>
        전체
      </span>
      <span className="skill" onClick={() => handleSkillClick('Javascript')}>
        JavaScript
      </span>
      <span className="skill" onClick={() => handleSkillClick('Nodejs')}>
        Nodejs
      </span>
      <span className="skill" onClick={() => handleSkillClick('Spring')}>
        Spring
      </span>
      <span className="skill" onClick={() => handleSkillClick('React')}>
        React
      </span>
      <span className="skill" onClick={() => handleSkillClick('Vue')}>
        Vue
      </span>
      <span className="skill" onClick={() => handleSkillClick('TypeScript')}>
        TypeScript
      </span>
      <span className="skill" onClick={() => handleSkillClick('Figma')}>
        Figma
      </span>
      <span className="skill" onClick={() => handleSkillClick('Go')}>
        Go
      </span>
      <span className="skill" onClick={() => handleSkillClick('Nestjs')}>
        Nestjs
      </span>
    </div>
  );
}
