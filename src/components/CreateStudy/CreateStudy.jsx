import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import { create } from '../../store/modules/study';

// react-select
const animatedComponents = makeAnimated();

// select 데이터들
const numOptions = [
  { value: 'one', label: '1명' },
  { value: 'two', label: '2명' },
  { value: 'three', label: '3명' },
  { value: 'four', label: '4명' },
  { value: 'five', label: '5명' },
];

const fieldOptions = [
  { value: 'web', label: '웹' },
  { value: 'app', label: '앱' },
  { value: 'game', label: '게임' },
  { value: 'product-manager', label: '기획' },
  { value: 'etc', label: '기타' },
];

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

export default function CreateStudy() {
  const studyNameInput = useRef();
  const studyIntroInput = useRef();
  const studyFieldSelect = useRef();
  const memberNumSelect = useRef();
  const skillSelect = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createStudyBtn = async () => {
    let skills = skillSelect.current.props.value;
    let skillsArr = [];
    for (let i = 0; i < skills.length; i++) {
      skillsArr.push(skills[i].label);
    }

    if (
      !studyNameInput.current.value ||
      !studyIntroInput.current.value ||
      !studyFieldSelect.current.props.value ||
      !memberNumSelect.current.props.value ||
      !skillSelect.current.props.value
    )
      return alert('필수 값을 입력해주세요.');

    const resCreate = await axios.post(
      'http://localhost:4000/study/create_study',
      {
        study_name: studyNameInput.current.value,
        study_intro: studyIntroInput.current.value,
        study_field: studyFieldSelect.current.props.value.label,
        skills: skillsArr,
        member_num: {
          currentNum: 0,
          maxNum: parseInt(
            memberNumSelect.current.props.value.label.split('명'),
          ),
        },
        member: {},
        board: {},
        structureImg: 'img',
      },
    );

    if (resCreate.status !== 200) return alert(resCreate.data);
    // 백엔드에서 에러 멘트 적어둔거
    // 200이 아니면 여기서 함수 자체가 종료

    alert(resCreate.data);
    // 200이 들어오면 백엔드에서 작성한
    // '스터디 생성 성공' 뜸
    // 그리고 밑에 navigate() 주소로 이동

    console.log();

    dispatch(
      create({
        study_name: studyNameInput.current.value,
        study_intro: studyIntroInput.current.value,
        study_field: studyFieldSelect.current.props.value.label,
        skills: skillsArr,
        member_num: {
          currentNum: 0,
          maxNum: parseInt(
            memberNumSelect.current.props.value.label.split('명'),
          ),
        },
        member: {},
        board: {},
        structureImg: 'img',
      }),
    );
    return navigate('/study'); // 일단 생성 완료 시 /study로 가게 함
  };
  return (
    <>
      <h1>1. 스터디의 기본 정보를 입력해주세요. </h1>
      <p>* 스터디명</p>
      <input
        type="text"
        ref={studyNameInput}
        placeholder="3~10자 이내로 입력해주세요."
      />
      <p>* 모집인원</p>
      <Select
        options={numOptions}
        placeholder="최대 5명까지 선택할 수 있습니다."
        ref={memberNumSelect}
      />

      <p>* 모집분야</p>
      <Select
        options={fieldOptions}
        placeholder="프론트엔드 / 백엔드 / 게임 / 기획 등 추후 추가 예정"
        ref={studyFieldSelect}
      />
      <p>* 사용언어</p>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={skillOptions[0]}
        isMulti
        options={skillOptions}
        ref={skillSelect}
      />
      <h1>2. 스터디에 대해 소개해주세요. </h1>
      {/* <p>* 스터디 한 줄 소개</p>
      <input
        type="text"
        ref={studyIntroInput}
        placeholder="30자 이내로 입력해주세요."
      />
      <br /> */}
      <p>* 스터디 소개</p>
      <textarea
        name=""
        id=""
        cols={40}
        rows={8}
        placeholder="스터디 소개"
        ref={studyIntroInput}
      ></textarea>
      <br />
      <br />
      <button onClick={createStudyBtn}>스터디 생성하기</button>
    </>
  );
}
