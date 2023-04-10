import React, { useState } from 'react';
import MonthSelectBox from './MonthSelectBox';
import DaySelector from './DaySelector';
import TodoList from './TodoList';
import '../../style/todoListTab.scss';

export default function TodoListTab() {
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
        src={isBoxOpen ? '/images/icon_expand_up.svg' : 'images/icon_expand_down.svg'}
        alt="expand"
        onClick={() => {
          setIsBoxOpen((cur) => !cur);
        }}
      />
      {isBoxOpen && (
        <MonthSelectBox
          setIsBoxOpen={setIsBoxOpen}
          setSelectedDate={setSelectedDate}
        />
      )}
      <DaySelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <hr />
      <TodoList />
    </div>
  );
}
