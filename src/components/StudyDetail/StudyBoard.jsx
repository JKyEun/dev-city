import React from 'react';
import Post from './Post';
import '../../style/studyBoard.scss';

export default function StudyBoard() {
  return (
    <div className="studyBoardWrap">
      <form className="createPostForm">
        <input type="text" placeholder="하고 싶은 말을 적어보세요!" />
        <button>작성하기</button>
      </form>
      <Post />
    </div>
  );
}
