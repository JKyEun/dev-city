import React, { useEffect, useRef, useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Post({ boardDB, boardEl, setBoardDB }) {
  const { id } = useParams();
  const [writerInfo, setWriterInfo] = useState(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const contentInput = useRef();
  const commentInput = useRef();
  const date = new Date(boardEl.date);
  const dateFormat = boardEl.isModified
    ? date.getFullYear() +
      '. ' +
      (date.getMonth() + 1) +
      '. ' +
      date.getDate() +
      '.' +
      ' (수정됨)'
    : date.getFullYear() +
      '. ' +
      (date.getMonth() + 1) +
      '. ' +
      date.getDate() +
      '.';

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
      id: boardEl.id,
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
        id: boardEl.id,
        content: contentInput.current.value,
        date: boardEl.date,
        comment: boardEl.comment,
        writer: boardEl.writer,
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

  const addComment = async (e) => {
    e.preventDefault();

    const newComment = {
      boardId: boardEl.id,
      id: +new Date(),
      writer: userInfo.userId,
      date: new Date().toString(),
      content: commentInput.current.value,
      isModified: false,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/board/add/comment/${id}`,
        newComment,
      );

      console.log(res.data);

      const newBoardDB = boardDB.map((board) => {
        if (board.id === boardEl.id) {
          const updatedObj = {
            ...board,
            comment: [...board.comment, newComment],
          };
          return updatedObj;
        }
        return board;
      });

      setBoardDB(newBoardDB);
    } catch (err) {
      console.error(err);
    }

    commentInput.current.value = '';
  };

  useEffect(() => {
    getWriterInfo(boardEl.writer);
  }, []);

  useEffect(() => {
    if (contentInput.current) contentInput.current.value = boardEl.content;
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
                <div className="content">{boardEl.content}</div>
              )}
              <div
                onClick={() => {
                  setIsCommentOpen((cur) => !cur);
                }}
                className="getComment"
              >
                {boardEl.comment.length === 0
                  ? '댓글 달기'
                  : `${boardEl.comment.length}개의 댓글`}
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
          {boardEl.comment.map((el) => (
            <Comment
              key={el.id}
              boardEl={boardEl}
              commentEl={el}
              boardDB={boardDB}
              setBoardDB={setBoardDB}
            />
          ))}
          <form onSubmit={(e) => addComment(e)} className="commentInput">
            <img src="/images/icon_github.svg" alt="본인 프로필" width="40" />
            <input
              ref={commentInput}
              type="text"
              placeholder="하고 싶은 말을 적어보세요!"
            />
            <button className="commentBtn">
              <img src="/images/icon_plus.svg" alt="추가" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
