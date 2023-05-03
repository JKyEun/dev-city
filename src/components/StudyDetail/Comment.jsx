import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostDropdown from './PostDropdown';

export default function Comment({
  boardEl,
  commentEl,
  boardDB,
  setBoardDB,
  getBoard,
}) {
  const { id } = useParams();
  const [commentWriterInfo, setCommentWriterInfo] = useState(null);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isMyComment, setIsMyComment] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const commentModifyInput = useRef(null);
  const date = new Date(commentEl.date);
  const dateFormat = commentEl.isModified
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

      setCommentWriterInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async () => {
    const comment = {
      boardId: boardEl.id,
      id: commentEl.id,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/board/delete/comment/${id}`,
        comment,
      );

      console.log(res.data);

      const newBoardDB = boardDB.map((board) => {
        if (board.id === boardEl.id) {
          const updatedComments = board.comment.filter(
            (comment) => comment.id !== commentEl.id,
          );
          const updatedObj = {
            ...board,
            comment: updatedComments,
          };
          return updatedObj;
        }
        return board;
      });

      setBoardDB(newBoardDB);
    } catch (err) {
      console.error(err);
    }
  };

  const modifyComment = async () => {
    const modifiedComment = {
      boardId: boardEl.id,
      id: commentEl.id,
      writer: commentEl.writer,
      date: commentEl.date,
      content: commentModifyInput.current.value,
      isModified: true,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/board/modify/comment/${id}`,
        modifiedComment,
      );

      console.log(res.data);

      getBoard();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWriterInfo(commentEl.writer);
  }, []);

  useEffect(() => {
    if (commentModifyInput.current)
      commentModifyInput.current.value = commentEl.content;
    if (commentWriterInfo && commentWriterInfo.userId === userInfo.userId) {
      setIsMyComment(true);
    }
  });

  // 프로필 이미지 클릭 시 드롭 다운
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  const handleImgClick = () => {
    setShowDropdown(!showDropdown); // showDropdown 값을 반전시킴
  };

  return (
    <>
      {commentWriterInfo !== null && (
        <div className="comment">
          <div className="imgWrap" onClick={handleImgClick} ref={dropdownRef}>
            <img
              src={
                commentWriterInfo.profileImg.includes('http')
                  ? commentWriterInfo.profileImg
                  : !commentWriterInfo.profileImg
                  ? '/images/default-profile.png'
                  : `http://localhost:4000/uploads/${commentWriterInfo?.profileImg}`
              }
              alt="댓글 작성자 프로필"
            />
            {showDropdown && userInfo.userId !== commentWriterInfo.userId && (
              <PostDropdown writerInfo={commentWriterInfo} />
            )}
          </div>

          {isModifyMode ? (
            <>
              <form
                onSubmit={() => {
                  setIsModifyMode((cur) => !cur);
                  modifyComment();
                }}
              >
                <div className="rightWrap">
                  <div className="commentInfo">
                    <span>{commentWriterInfo.nickName}</span>
                    <span>{dateFormat}</span>
                  </div>
                  <input
                    ref={commentModifyInput}
                    className="commentModifyInput"
                    type="text"
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    setIsModifyMode((cur) => !cur);
                    modifyComment();
                  }}
                  className="modifyBtn"
                >
                  수정
                </button>
              </form>
              <button onClick={deleteComment} className="deleteBtn">
                삭제
              </button>
            </>
          ) : (
            <>
              <div className="rightWrap">
                <div className="commentInfo">
                  <span>{commentWriterInfo.nickName}</span>
                  <span>{dateFormat}</span>
                </div>
                <div className="commentContent">{commentEl.content}</div>
              </div>
              {isMyComment && (
                <>
                  <button
                    onClick={() => {
                      setIsModifyMode((cur) => !cur);
                    }}
                    className="modifyBtn"
                  >
                    수정
                  </button>
                  <button onClick={deleteComment} className="deleteBtn">
                    삭제
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
