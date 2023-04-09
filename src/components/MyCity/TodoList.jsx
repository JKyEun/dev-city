import React, { useState } from 'react';
import MonthSelectBox from './MonthSelectBox';
import DaySelector from './DaySelector';

export default function TodoList() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <span>
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
      <DaySelector selectedDate={selectedDate} />
    </>
  );
}
