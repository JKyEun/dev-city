import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../../store/modules/study';
import '../../style/recruitBoard/Category.scss';

export default function Category() {
  const dispatch = useDispatch();
  const handleSkillClick = (e, skillName) => {
    if (e.target.style.borderColor === '' || e.target.style.color === '') {
      e.target.style.borderColor = 'rgba(153,153,153,0.6)';
      e.target.style.color = 'rgba(153,153,153,0.6)';
    }
    if (
      e.target.style.borderColor === 'rgba(153, 153, 153, 0.6)' ||
      e.target.style.color === 'rgba(153, 153, 153, 0.6)'
    ) {
      e.target.style.borderColor = '#605cff';
      e.target.style.color = '#605cff';
    } else {
      e.target.style.borderColor = 'rgba(153,153,153,0.6)';
      e.target.style.color = '#000000';
    }
    const action = changeCategory(skillName);
    dispatch(action);
  };

  const element = [
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
            onClick={(e) => handleSkillClick(e, el)}
          >
            {el}
          </span>
        );
      })}
    </div>
  );
}
