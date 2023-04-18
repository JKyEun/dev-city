import React, { useState } from 'react';
import '../../style/todoListTab.scss';
import IndividualMonthSelectBox from './IndividualMonthSelectBox';
import IndividualDaySelector from './IndividualDaySelector';
import IndividualTodoList from './IndividualTodoList';

export default function IndividualTodoListTab({ individualInfo }) {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="todoListTabWrap">
      <span className="yearMonth">
        {selectedDate.getFullYear() +
          '. ' +
          (selectedDate.getMonth() + 1) +
          '.'}
      </span>
      <img
        className="expandBtn"
        src={
          isBoxOpen
            ? '/images/icon_expand_up.svg'
            : '/images/icon_expand_down.svg'
        }
        alt="expand"
        onClick={() => {
          setIsBoxOpen((cur) => !cur);
        }}
      />
      {isBoxOpen && (
        <IndividualMonthSelectBox
          setIsBoxOpen={setIsBoxOpen}
          setSelectedDate={setSelectedDate}
        />
      )}
      <IndividualDaySelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <hr />
      <IndividualTodoList
        individualInfo={individualInfo}
        selectedDate={selectedDate}
      />
    </div>
  );
}
