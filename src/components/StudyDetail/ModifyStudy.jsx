import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link, useNavigate } from 'react-router-dom';
import { editMode, modify } from '../../store/modules/studyDetail';
import 'react-circular-progressbar/dist/styles.css';
import '../../style/modifyStudy.scss';

// react-select
const animatedComponents = makeAnimated();

// select 데이터들
const fieldOptions = [
  { value: 'front-end', label: '프론트엔드' },
  { value: 'back-end', label: '백엔드' },
  { value: 'web', label: '웹' },
  { value: 'app', label: '앱' },
  { value: 'game', label: '게임' },
  { value: 'product-manager', label: '기획' },
  { value: 'ai', label: 'AI' },
  { value: 'game', label: '데이터 분석' },
  { value: 'block-chain', label: '블록체인' },
  { value: 'security', label: '보안' },
  { value: 'embedded', label: '임베디드' },
  { value: 'ux-ui', label: 'UX/UI' },
];

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Nextjs' },
  { value: 'vue', label: 'Vue' },
  { value: 'spring', label: 'Spring' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'nestjs', label: 'Nestjs' },
  { value: 'nodejs', label: 'Nodejs' },
  { value: 'figma', label: 'Figma' },
  { value: 'angular', label: 'Angular' },
  { value: 'aws', label: 'AWS' },
  { value: 'c#', label: 'C#' },
  { value: 'django', label: 'Django' },
  { value: 'express', label: 'Express' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'jsp', label: 'JSP' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'oracle', label: 'Oracle' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'reactnative', label: 'ReactNative' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'swift', label: 'Swift' },
  { value: 'unity', label: 'Unity' },
  { value: 'unreal', label: 'Unreal' },
];

export default function ModifyStudy({ match }) {
  const studyNameInput = useRef();
  const studyIntroInput = useRef();
  const studyFieldSelect = useRef();
  const skillSelect = useRef();
  const studySystemInput = useRef();
  const etcInput = useRef();

  const study = useSelector((state) => state.studyDetail.study);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      studyNameInput.current &&
      studyIntroInput.current &&
      studyFieldSelect.current &&
      skillSelect.current &&
      studySystemInput.current &&
      etcInput.current
    ) {
      studyNameInput.current.value = study.studyName;
      studyIntroInput.current.value = study.studyIntro;
      studyFieldSelect.current.value = study.field;
      skillSelect.current.value = study.skills;
      studySystemInput.current.value = study.studySystem;
      etcInput.current.value = study.etc;
    }
  });

  const modifyStudy = async () => {
    try {
      let skills = skillSelect.current.props.value;
      let skillsArr = [];
      for (let i = 0; i < skills.length; i++) {
        skillsArr.push(skills[i].label);
      }

      if (
        !studyNameInput.current.value ||
        !studyIntroInput.current.value ||
        !studyFieldSelect.current.props.value ||
        !skillSelect.current.props.value ||
        !studySystemInput.current.value
      )
        return alert('필수 값을 입력해 주세요.');

      const modifyData = {
        studyName: studyNameInput.current.value,
        studyIntro: studyIntroInput.current.value,
        studySystem: studySystemInput.current.value,
        field: studyFieldSelect.current.props.value.label,
        skills: skillsArr,
        etc: etcInput.current.value,
      };

      const resModify = await axios.post(
        `http://3.34.52.131:4000/study/modify/${match.params.id}`,
        { modifyData, userId: localStorage.getItem('userId') },
      );

      alert(resModify.data);

      dispatch(
        modify({
          ...study,
          studyName: studyNameInput.current.value,
          studyIntro: studyIntroInput.current.value,
          field: studyFieldSelect.current.props.value.label,
          skills: skillsArr,
          studySystem: studySystemInput.current.value,
          etc: etcInput.current.value,
        }),
        dispatch(editMode(false)),
      );
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  };
  const elementContent = [
    {
      title: '기본정보',
      detail: [
        {
          subTitle: '스터디명',
          require: true,
          input: (
            <input
              className="inputContainer inputBox"
              type="text"
              ref={studyNameInput}
              placeholder="30자 이내로 입력해 주세요."
              maxLength={30}
            />
          ),
        },
        {
          subTitle: '모집분야',
          require: true,
          input: (
            <Select
              className="inputContainer"
              options={fieldOptions}
              placeholder="모집 분야를 선택해주세요."
              ref={studyFieldSelect}
              defaultValue={fieldOptions.find(
                (option) => option.label === study.field,
              )}
            />
          ),
        },
        {
          subTitle: '사용언어',
          require: true,
          input: (
            <Select
              className="inputContainer"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={skillOptions}
              placeholder="사용 언어를 선택해 주세요."
              ref={skillSelect}
              defaultValue={skillOptions.filter((option) =>
                study.skills.includes(option.label),
              )}
            />
          ),
        },
      ],
    },
    {
      title: '세부정보',
      detail: [
        {
          subTitle: '스터디 한 줄 소개',
          require: true,
          input: (
            <textarea
              className="inputContainer"
              name=""
              id=""
              cols={40}
              rows={2}
              placeholder="스터디를 소개하는 글을 작성해 주세요."
              ref={studyIntroInput}
            ></textarea>
          ),
        },
        {
          subTitle: '회의 진행 / 모임 방식',
          require: true,
          input: (
            <textarea
              className="inputContainer"
              name=""
              id=""
              cols={40}
              rows={8}
              placeholder={`- 1주에 몇 번 정도 회의나 모임을 진행할 계획인가요?\n(ex - 일주일에 1회, 2회 정도 정기적으로 회의합니다.)\n\n- 온/오프라인 회의 진행시 진행 방식을 적어주세요.\n(ex - 온라인은 줌을 활용하고, 오프라인은 강남역 카페를 대관할 예정입니다.)`}
              ref={studySystemInput}
            ></textarea>
          ),
        },
        {
          subTitle: '기타',
          require: false,
          input: (
            <input
              className="inputContainer inputBox"
              type="text"
              placeholder="기타 사항을 입력하세요."
              ref={etcInput}
            />
          ),
        },
      ],
    },
  ];

  return (
    <div className="minMax flexBox-between">
      <div className="box-write">
        <Link to={'/study'}>
          <img
            className="left-arrow"
            src="/images/left-arrow.svg"
            alt="left-arrow"
          />
          스터디홈으로 돌아가기
        </Link>
        <h1>스터디 수정하기</h1>
        {elementContent.map((el, idx) => {
          return (
            <Fragment key={idx}>
              <h3>{el.title}</h3>
              <div className="studyInputBox">
                {el.detail.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`flexBox${
                        el.title === '기본정보' ? '-alignCenter' : ''
                      } studyInputSubBox`}
                    >
                      <p className="subTitle">
                        {item.subTitle}
                        {item.require && <span className="require">*</span>}
                      </p>
                      {item.input}
                    </div>
                  );
                })}
              </div>
            </Fragment>
          );
        })}
      </div>

      <div className="box-modifyStudy">
        <a className="btn btn--modify" onClick={modifyStudy}>
          저장하기
        </a>
        <a className="btn btn--cancel" onClick={() => navigate(-1)}>
          취소하기
        </a>
      </div>
    </div>
  );
}
