import React, { useEffect, useState } from 'react';
import Post from './Post';
import '../../style/studyBoard.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function StudyBoard() {
  const { id } = useParams();
  const [boardDB, setBoardDB] = useState(null);

  console.log(boardDB);

  const getBoard = async () => {
    const res = await axios.get(`http://localhost:4000/board/get/${id}`);
    setBoardDB(res.data.board);
  };

  useEffect(() => {
    getBoard();
  }, []);
  return (
    <div className="studyBoardWrap">
      <form className="createPostForm">
        <input type="text" placeholder="하고 싶은 말을 적어보세요!" />
        <button>작성하기</button>
      </form>
      {boardDB !== null &&
        boardDB.map((el) => (
          <Post key={el.id} boardDB={el} setBoardDB={setBoardDB} />
        ))}
    </div>
  );
}
