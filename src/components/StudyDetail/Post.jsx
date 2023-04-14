import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import axios from 'axios';

export default function Post({ boardDB, setBoardDB }) {
  console.log(boardDB);
  const [writerInfo, setWriterInfo] = useState(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const date = new Date(boardDB.date);
  const dateFormat =
    date.getFullYear() + '. ' + date.getMonth() + '. ' + date.getDate() + '.';

  const getWriterInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);

      setWriterInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWriterInfo(boardDB.writer);
  }, []);

  return (
    <div className="post">
      <div className="postWrap">
        {writerInfo !== null && (
          <>
            <div className="leftSide">
              <img
                src={
                  writerInfo.profileImg
                    ? writerInfo.profileImg
                    : '/images/default-profile.png'
                }
                alt="작성자 프로필 사진"
              />
            </div>
            <div className="rightSide">
              <div className="postInfo">
                <div className="nickname">{writerInfo.nickName}</div>
                <div className="date">{dateFormat}</div>
              </div>
              <div className="content">{boardDB.content}</div>
              <div
                onClick={() => {
                  setIsCommentOpen((cur) => !cur);
                }}
                className="getComment"
              >
                {boardDB.comment.length === 0
                  ? '댓글 달기'
                  : `${boardDB.comment.length}개의 댓글`}
              </div>
              <button className="modifyBtn">수정</button>
              <button className="deleteBtn">삭제</button>
            </div>
          </>
        )}
      </div>
      {isCommentOpen && (
        <div className="commentWrap">
          {boardDB.comment.map((el) => (
            <Comment key={el.id} commentDB={el} setBoardDB={setBoardDB} />
          ))}
          <form className="commentInput">
            <img src="/images/icon_github.svg" alt="본인 프로필" width="40" />
            <input type="text" placeholder="하고 싶은 말을 적어보세요!" />
            <img
              className="commentBtn"
              src="/images/icon_plus.svg"
              alt="추가"
            />
          </form>
        </div>
      )}
    </div>
  );
}
