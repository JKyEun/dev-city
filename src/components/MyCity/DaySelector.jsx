import React, { useEffect, useRef, useState } from 'react';
import '../../style/daySelector.scss';

export default function DaySelector({ selectedDate }) {
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedWeek, setSelectedWeek] = useState([]);
  const selectedDateNum = useRef(selectedDate.getDate());

  const setWeek = () => {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDateNum.current,
    );
    const curDay = date.getDay();
    const curDate = date.getDate();
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    // 이번주 날짜 정보를 담을 배열
    const week = new Array(7).fill(0);

    // 이번주 날짜 배열에 설정
    for (let i = 0; i < curDay; i++) {
      if (curDate - curDay > 0) {
        week[i] = curDate - curDay + i;
      }
    }
    for (let i = curDay; i < 7; i++) {
      if (curDate + (i - curDay) <= lastDate) {
        week[i] = curDate + (i - curDay);
      }
    }

    setSelectedWeek(week);
  };

  const goPrevWeek = () => {
    if (selectedDateNum.current <= 7) {
      selectedDateNum.current = 1;
    } else {
      selectedDateNum.current -= 7;
    }
  };

  const goNextWeek = () => {
    const lastDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    ).getDate();
    if (selectedDateNum.current + 7 > lastDate) {
      selectedDateNum.current = lastDate;
    } else {
      selectedDateNum.current += 7;
    }
  };

  useEffect(() => {
    // 선택된 날짜 설정
    setWeek();
  });

  return (
    <div className="daySelector">
      <div onClick={goPrevWeek}>{'<'}</div>
      {selectedWeek.map((el, idx) => (
        <div className="eachDay">
          <div>{el === 0 ? ' ' : day[idx]}</div>
          <div>{el === 0 ? ' ' : el}</div>
        </div>
      ))}
      <div onClick={goNextWeek}>{'>'}</div>
    </div>
  );
}
