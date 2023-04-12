import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../../store/modules/study';
import '../../style/recruitBoard/SubHeader.scss';

export default function SubHeader() {
  const dispatch = useDispatch();
  const handleSkillClick = (skillName) => {
    const action = changeCategory(skillName);
    dispatch(action);
  };

  const element = [
    '전체',
    'JavaScript',
    'Nodejs',
    'React',
    'Vue',
    'TypeScript',
    'Nextjs',
    'Java',
    'Spring',
    'Go',
    'Nestjs',
  ];

  return (
    <div className="skills">
      {element.map((el) => {
        return (
          <span
            key={el}
            className={'skill'}
            onClick={() => handleSkillClick(el)}
          >
            {el}
          </span>
        );
      })}
    </div>
  );
}
