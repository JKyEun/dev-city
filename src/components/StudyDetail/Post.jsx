import React from 'react';
import Comment from './Comment';

export default function Post() {
  return (
    <div className="post">
      <div className="postWrap">
        <div className="leftSide">
          <img src="/images/icon_github.svg" alt="작성자 프로필 사진" />
        </div>
        <div className="rightSide">
          <div className="postInfo">
            <div className="nickname">멋쟁이 토마토</div>
            <div className="date">2023.04.14.</div>
          </div>
          <div className="content">안녕하세요. 게시판을 만들고 있어요.</div>
          <div className="getComment">댓글보기</div>
          <button className="modifyBtn">수정</button>
          <button className="deleteBtn">삭제</button>
        </div>
      </div>
      <Comment />
    </div>
  );
}
