import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Comment({ boardEl, commentEl, boardDB, setBoardDB }) {
  const { id } = useParams();
  const [commentWriterInfo, setCommentWriterInfo] = useState(null);
  const userInfo = useSelector((state) => state.user);
  const date = new Date(commentEl.date);
  const dateFormat =
    date.getFullYear() +
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

  useEffect(() => {
    getWriterInfo(commentEl.writer);
  }, []);

  return (
    <>
      {commentWriterInfo !== null && (
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
              <span>{commentWriterInfo.nickName}</span>
              <span>{dateFormat}</span>
            </div>
            <div className="commentContent">{commentEl.content}</div>
          </div>
          <button  className="modifyBtn">수정</button>
          <button onClick={deleteComment} className="deleteBtn">
            삭제
          </button>
        </div>
      )}
    </>
  );
}
