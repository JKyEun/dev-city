import React from 'react';

export default function Comment() {
  return (
    <div className="commentWrap">
      <div className="comment">
        <div>
          <img
            src="/images/icon_github.svg"
            alt="댓글 작성자 프로필"
            width="40"
          />
        </div>
        <div>
          <div className="commentInfo">
            <span>잘 익은 토마토</span>
            <span>2023.04.15</span>
          </div>
          <div className="commentContent">하이하이 하이 댓글이야</div>
        </div>
      <button className="modifyBtn">수정</button>
      <button className="deleteBtn">삭제</button>
      </div>
      <form className="commentInput">
        <img src="/images/icon_github.svg" alt="본인 프로필" width="40" />
        <input type="text" placeholder="하고 싶은 말을 적어보세요!" />
        <img className="commentBtn" src="/images/icon_plus.svg" alt="추가" />
      </form>
    </div>
  );
}
