import React, { useEffect, useRef, useState } from 'react';

export default function IndividualDaySelector({ selectedDate, setSelectedDate }) {
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedWeek, setSelectedWeek] = useState([]);
  const selectedDateNum = useRef(selectedDate.getDate());

  const setWeek = () => {
    const curDay = selectedDate.getDay();
    const curDate = selectedDate.getDate();
    const lastDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    ).getDate();
    // 이번주 날짜 정보를 담을 배열
    const week = new Array(7).fill(0);

    // 이번주 날짜 배열에 설정
    for (let i = 0; i < curDay; i++) {
      if (curDate - curDay + i > 0) {
        week[i] = curDate - curDay + i;
      }
    }
    for (let i = curDay; i < 7; i++) {
      if (curDate + (i - curDay) <= lastDate) {
        week[i] = curDate + (i - curDay);
      }
    }

    selectedDateNum.current = curDate;
    setSelectedWeek(week);
  };

  const goPrevWeek = () => {
    if (selectedDateNum.current <= 7) {
      selectedDateNum.current = 1;
    } else {
      selectedDateNum.current -= 7;
    }

    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDateNum.current,
    );

    setSelectedDate(newDate);
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

    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDateNum.current,
    );

    setSelectedDate(newDate);
  };

  const changeSelectedDate = (curDate) => {
    selectedDateNum.current = curDate;
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDateNum.current,
      ),
    );
  };

  useEffect(() => {
    // 선택된 날짜 설정
    setWeek();
  }, [selectedDate]);

  return (
    <div className="daySelector">
      <img
        src="/images/icon_prev.svg"
        alt="이전으로"
        className="prevBtn"
        onClick={goPrevWeek}
      />
      {selectedWeek.map((el, idx) => (
        <div
          key={idx}
          className={
            selectedDateNum.current === el ? 'eachDay selected' : 'eachDay'
          }
          onClick={() => changeSelectedDate(el)}
        >
          <div className="day">{el === 0 ? ' ' : day[idx]}</div>
          <div className="date">{el === 0 ? ' ' : el}</div>
        </div>
      ))}
      <img
        src="/images/icon_next.svg"
        alt="다음으로"
        className="nextBtn"
        onClick={goNextWeek}
      />
    </div>
  );
}
