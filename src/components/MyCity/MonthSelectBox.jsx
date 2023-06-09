import React, { useState } from 'react';

const yearData = [
  { label: '2020년', value: 2020 },
  { label: '2021년', value: 2021 },
  { label: '2022년', value: 2022 },
  { label: '2023년', value: 2023 },
  { label: '2024년', value: 2024 },
];

const monthData = [
  { label: '1월', value: 1 },
  { label: '2월', value: 2 },
  { label: '3월', value: 3 },
  { label: '4월', value: 4 },
  { label: '5월', value: 5 },
  { label: '6월', value: 6 },
  { label: '7월', value: 7 },
  { label: '8월', value: 8 },
  { label: '9월', value: 9 },
  { label: '10월', value: 10 },
  { label: '11월', value: 11 },
  { label: '12월', value: 12 },
];

export default function MonthSelectBox({ setIsBoxOpen, setSelectedDate }) {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  if (selectedYear && selectedMonth) {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, 1));
    setIsBoxOpen(false);
    setSelectedYear(null);
    setSelectedMonth(null);
  }

  const onYearClick = (el) => {
    setSelectedYear(el.value);
  };

  const onMonthClick = (el) => {
    setSelectedMonth(el.value);
  };

  return (
    <div className="selectBoxContainer">
      <div className="yearSelect">
        <p>연도</p>
        <ul>
          {yearData.map((el) => (
            <li
              onClick={() => {
                onYearClick(el);
              }}
              className={selectedYear === el.value && 'selected'}
              key={el.label}
            >
              {el.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="monthSelect">
        <p>달</p>
        <ul>
          {monthData.map((el) => (
            <li
              onClick={() => {
                onMonthClick(el);
              }}
              className={selectedMonth === el.value && 'selected'}
              key={el.label}
            >
              {el.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
