import React, { useState } from 'react';
import MonthSelectBox from './MonthSelectBox';
import DaySelector from './DaySelector';
import TodoList from './TodoList';
import '../../style/todoListTab.scss';

export default function TodoListTab() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <span className="yearMonth">
        {selectedDate.getFullYear() +
          '. ' +
          (selectedDate.getMonth() + 1) +
          '.'}
      </span>
      <span
        onClick={() => {
          setIsBoxOpen((cur) => !cur);
        }}
      >
        ⌵
      </span>
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
    </>
  );
}
