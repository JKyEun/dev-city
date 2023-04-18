import React, { useEffect, useRef, useState } from 'react';
import Post from './Post';
import '../../style/studyBoard.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function StudyBoard() {
  const { id } = useParams();
  const [boardDB, setBoardDB] = useState(null);
  const userInfo = useSelector((state) => state.user);
  const boardInput = useRef();

  const userId = localStorage.getItem('userId');
  const isMember = useSelector((state) =>
    state.studyDetail.study.member.some((member) => member.memberId === userId),
  );

  const getBoard = async () => {
    const res = await axios.get(`http://3.34.52.131:4000/board/get/${id}`);
    setBoardDB(res.data.board);
  };

  const addPost = async (e) => {
    e.preventDefault();

    if (boardInput.current.value === '') return;

    const newPost = {
      id: +new Date(),
      writer: userInfo.userId,
      date: new Date().toString(),
      content: boardInput.current.value,
      comment: [],
      isModified: false,
    };
    try {
      const res = await axios.post(
        `http://3.34.52.131:4000/board/add/${id}`,
        newPost,
      );
      console.log(res.data);

      const newBoardDB = [...boardDB, newPost];
      setBoardDB(newBoardDB);

      boardInput.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className="studyBoardWrapContainer">
      {isMember ? null : (
        <div className="lockIconWrap">
          <FontAwesomeIcon icon={faLock} />
          <h2>조회 권한이 없습니다</h2>
        </div>
      )}
      <div
        className="studyBoardWrap"
        style={{
          filter: isMember ? 'none' : 'blur(10px)',
          pointerEvents: isMember ? 'auto' : 'none',
          userSelect: isMember ? 'auto' : 'none',
        }}
      >
        <form className="createPostForm">
          <input
            ref={boardInput}
            type="text"
            placeholder="하고 싶은 말을 적어보세요!"
          />
          <button onClick={(e) => addPost(e)}>작성하기</button>
        </form>
        {boardDB !== null &&
          boardDB.map((el) => (
            <Post
              key={el.id}
              boardDB={boardDB}
              boardEl={el}
              setBoardDB={setBoardDB}
              getBoard={getBoard}
            />
          ))}
      </div>
    </div>
  );
}
