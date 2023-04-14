import React, { useEffect, useRef, useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Post({ boardDB, el, setBoardDB }) {
  const { id } = useParams();
  const [writerInfo, setWriterInfo] = useState(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const contentInput = useRef();
  const date = new Date(el.date);
  const dateFormat = el.isModified
    ? date.getFullYear() +
      '. ' +
      date.getMonth() +
      '. ' +
      date.getDate() +
      '.' +
      ' (수정됨)'
    : date.getFullYear() + '. ' + date.getMonth() + '. ' + date.getDate() + '.';

  const getWriterInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);

      setWriterInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    const deletePost = {
      id: el.id,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/board/delete/${id}`,
        deletePost,
      );
      console.log(res.data);

      const newBoardDB = boardDB.filter((el) => el.id !== deletePost.id);
      setBoardDB(newBoardDB);
    } catch (err) {
      console.error(err);
    }
  };

  const modifyPost = async () => {
    try {
      const modifiedPost = {
        id: el.id,
        content: contentInput.current.value,
        date: el.date,
        comment: el.comment,
        writer: el.writer,
        isModified: true,
      };

      console.log(modifiedPost);

      const res = await axios.post(
        `http://localhost:4000/board/modify/${id}`,
        modifiedPost,
      );

      console.log(res.data);

      const removedBoardDB = boardDB.filter((el) => el.id !== modifiedPost.id);
      const newBoardDB = [...removedBoardDB, modifiedPost];

      setBoardDB(newBoardDB);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWriterInfo(el.writer);
  }, []);

  useEffect(() => {
    if (contentInput.current) contentInput.current.value = el.content;
  });

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
              {isModifyMode ? (
                <input
                  type="text"
                  className="contentInput"
                  ref={contentInput}
                />
              ) : (
                <div className="content">{el.content}</div>
              )}
              <div
                onClick={() => {
                  setIsCommentOpen((cur) => !cur);
                }}
                className="getComment"
              >
                {el.comment.length === 0
                  ? '댓글 달기'
                  : `${el.comment.length}개의 댓글`}
              </div>
              <button
                onClick={() => {
                  isModifyMode && modifyPost();
                  setIsModifyMode((cur) => !cur);
                }}
                className="modifyBtn"
              >
                수정
              </button>
              <button onClick={deletePost} className="deleteBtn">
                삭제
              </button>
            </div>
          </>
        )}
      </div>
      {isCommentOpen && (
        <div className="commentWrap">
          {el.comment.map((el) => (
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
